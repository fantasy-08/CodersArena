import React from 'react'
import { InfoContext } from "../App";
import { Card, CardContent, Typography, Container } from "@material-ui/core";
import {useParams} from 'react-router-dom';

function EndTest({}) {
    const { state } = React.useContext(InfoContext);

    const [myScore,setMyScore]=React.useState(0)
    const [leaderboard, setLeaderboard] = React.useState();

    const[error,setError]=React.useState();

    const { testID } = useParams();
    React.useEffect(()=>{
        console.log(state)
        const getScore=async ()=>{
            const res = await fetch(`/api/${testID}/get_result`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${state.token}`,
				},
			});
            const data=await res.json();
            if(data.error){
                setError(data.error)
            }else{
                setMyScore(data.score)
            }
        }      
        const getLeaderboard=async ()=>{
            const res = await fetch(`/api/${testID}/leaderboard`);
            const data=await res.json();
            if (data.error) {
				setError(data.error);
			} else {
                var A=data.message;
                function compare(a, b) {
					if (a.score > b.score) {
						return -1;
					}
					if (a.score < b.score) {
						return 1;
					}
					return 0;
				}

                A.sort(compare);
				setLeaderboard(A);
			}
        }
        
        getScore();
        getLeaderboard();
    },[])
    return (
		<>
			<Container>
				<Card variant="outlined" style={{ marginTop: "1.5em" }}>
					<br />
					<Typography variant="h5" component="h2" align="center">
						My Result
					</Typography>
					<CardContent>
						<Typography
							color="textSecondary"
							gutterBottom
							align="center"
						>
							{state.user.email}
						</Typography>
						<Typography variant="h5" component="h2" align="center">
							{state.user.name}
						</Typography>
						<Typography
							color="textSecondary"
							align="center"
							style={{ color: myScore >= 20 ? "green" : "red" }}
						>
							{myScore >= 20
								? "(Good Job)"
								: "(You can do better)"}
						</Typography>
						<Typography
							variant="body2"
							component="p"
							align="center"
						>
							{`Score ${myScore} points`}
						</Typography>
					</CardContent>
				</Card>
			</Container>
			<Container>
				{leaderboard ? (
					<>
						<Card variant="outlined" style={{ marginTop: "1.5em" }}>
							<CardContent>
								<Typography variant="h5" component="h2">
									Leaderboard
								</Typography>
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
											SNO
										</th>
										<th
											style={{
												border: "1px solid black",
												textAlign: "center",
											}}
										>
											Name
										</th>
										<th
											style={{
												border: "1px solid black",
												textAlign: "center",
											}}
										>
											E-Mail
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

									{leaderboard.map((attend, index) => {
										return (
											<tr
												style={{
													border: "1px solid black",
													backgroundColor:
														attend.email ===
														state.user.email
															? "lightcyan"
															: "",
												}}
											>
												<td
													style={{
														border:
															"1px solid black",
														textAlign: "center",
													}}
												>
													{index + 1}
												</td>
												<td
													style={{
														border:
															"1px solid black",
														textAlign: "center",
													}}
												>
													{attend.name}
												</td>
												<td
													style={{
														border:
															"1px solid black",
														textAlign: "center",
													}}
												>
													{attend.email}
												</td>
												<td
													style={{
														border:
															"1px solid black",
														textAlign: "center",
													}}
												>
													{attend.score}
												</td>
											</tr>
										);
									})}
								</table>
							</CardContent>
						</Card>
					</>
				) : (
					<></>
				)}
			</Container>
		</>
	);
}

export default EndTest
