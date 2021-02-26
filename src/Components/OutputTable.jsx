import React from 'react'
import Alert from "./Alert";
import DisplayCase from './DisplayCase';

function OutputTable({ qID, testCaseSize, code, prog, CompilerArgs }) {
	const [state, setState] = React.useState({
		ac: 0,
		re: 0,
		wa: 0,
	});
	const [casestatus,setCasestatus]=React.useState([])


	React.useEffect(() => {
        const temp = [];
		for (var i = 0; i < testCaseSize; i++) {
			temp.push(i);
			setCasestatus(prev=>{
				return [
					...prev,"pending"
				]
			})
		}

		var ind=0;

		const id=setInterval(()=>{
			if(ind>=testCaseSize){
				clearInterval(id);
			}else{
			        const getAnswer = async (k) => {
						const parameter = {
							LanguageChoice: code,
							Program: prog,
							CompilerArgs,
						};
						const request = await fetch(`api/result/${qID}/${k}`, {
							method: "POST",
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							},
							body: JSON.stringify(parameter),
						});

						const msg = await request.json();

						console.log(msg.message);

						if (msg.message) setCasestatus(prev=>{
							var Temp=prev;
							Temp[k] = msg.message;
							return Temp;
						});

						if (msg.message)
							if (msg.message === "AC")
								setState((prev) => {
									return {
										...prev,
										ac: prev.ac + 1,
									};
								});
							else if (msg.message === "WA")
								setState((prev) => {
									return {
										...prev,
										wa: prev.wa + 1,
									};
								});
							else
								setState((prev) => {
									return {
										...prev,
										re: prev.re + 1,
									};
								});
					};
					getAnswer(ind);
					ind+=1;
				}

		},2000)
	}, []);

	return (
		<>
			<br />
			<Alert
				color={
					state.ac === 0 && state.re === 0 && state.wa === 0
						? "info"
						: state.ac === 0 && state.re === 0
						? "warning"
						: state.ac > 0
						? "success"
						: "error"
				}
				msg={`Total Score is ${state.ac * 10}`}
			/>
			<br />
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					border: "1px solid black",
				}}
			>
				<tr style={{ border: "1px solid black" }}>
					<th
						style={{
							border: "1px solid black",
							textAlign: "center",
						}}
					>
						Test Case
					</th>
					<th
						style={{
							border: "1px solid black",
							textAlign: "center",
						}}
					>
						Output
					</th>
					<th
						style={{
							border: "1px solid black",
							textAlign: "center",
						}}
					>
						Score
					</th>
				</tr>
				{
					casestatus.length === testCaseSize ?
					<>
					{casestatus.map((d,index) => {
						return <DisplayCase
							qID={qID}
							testCaseSize={testCaseSize}
							code={code}
							prog={prog}
							CompilerArgs={CompilerArgs}
							no={d}
							casestatus={index}
						/>;
						})}
					</>:
					<></>
				}
			</table>
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}

export default OutputTable



// {
// 	/* {arr.length === testCaseSize ? (
// 	<>
// 		{arr.map((d) => {
// 			return (
// 				<TestCase
// 					qID={qID}
// 					testCaseSize={testCaseSize}
// 					code={code}
// 					prog={prog}
// 					CompilerArgs={CompilerArgs}
// 					no={d}
// 					setState={setState}
// 				/>
// 			);
// 		})}
// 	</>
// ) : (
// 	<></>
// )} */
// }