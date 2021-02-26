import React from 'react'
import Icon from './Icon';

function TestCase({ qID, testCaseSize, code, prog, CompilerArgs ,no,setState}) {
    const [status,setStatus]=React.useState('')

    React.useEffect(()=>{
        const getAnswer=async ()=>{
            const parameter = {
				LanguageChoice: code,
				Program: prog,
				CompilerArgs
			};
            const request = await fetch(`api/result/${qID}/${no}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(parameter),
			});

            const msg=await request.json();

			console.log(msg.message);

            if(msg.message)
                setStatus(msg.message)
            
            if(msg.message)
                if(msg.message==='AC')
                    setState(prev=>{
                        return {
                            ...prev,
                            ac:prev.ac+1
                        }
                    })
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
        }
		getAnswer();
    },[]);
	return (
		<> 
			<tr style={{ border: "1px solid black" }}>
				<td style={{ border: "1px solid black",textAlign:"center" }}>{`Test Case ${no + 1}`}</td>
				<td style={{ border: "1px solid black",textAlign:"center" }}><Icon status={status}/></td>
				<td style={{ border: "1px solid black",textAlign:"center" }}>{status==="AC"?10:0}</td>
			</tr>
		</>
	);
}

export default TestCase
