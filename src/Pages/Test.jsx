import React from "react";
import {
	Grid,
	Typography,
	Card,
	CardContent,
	Container,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { InfoContext } from "../App";
function Test() {
	const { testID } = useParams();
	const [data, setData] = React.useState();
	const { state } = React.useContext(InfoContext);
	const [present, setPresent] = React.useState();
    const [choose,setChoose]=React.useState({})
	React.useEffect(() => {
		const getIncFight = async () => {
			const token = state.token;
			console.log(state);
			const req = await fetch(`/api/${testID}/giveTest`, {
				method: "POST",
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			const d = await req.json();
			if (d.message) {
				setData(d.message);
                setPresent(d.message[0])
			}
		};
		getIncFight();
	}, [state.token]);
	const handleSelect = (e) => {
		setPresent(e);
	};
	return (
		<>
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						{data ? (
							<>
								{data.map((ques) => {
									return (
										<>
											<Card
												variant="outlined"
												style={{ marginTop: "1em" }}
												onClick={(e) => {
													handleSelect(ques);
												}}
											>
												<CardContent>
													<Typography
														color="textSecondary"
														gutterBottom
													>
														{ques.title}
														<span
															style={{
																display: "none",
															}}
														>
															{ques._id}
														</span>
													</Typography>
												</CardContent>
											</Card>
										</>
									);
								})}
							</>
						) : (
							<></>
						)}
					</Grid>
					<Grid item xs={9}>
						{present ? (
							<>
								<Card
									variant="outlined"
									style={{ marginTop: "1em" }}
									onClick={handleSelect}
								>
									<CardContent>
										<Typography variant="h5" component="h2">
											{present.title}
										</Typography>
                                        <br/>
										<Typography
											variant="body2"
											component="p"
										>
											{present.statement}
										</Typography>
									</CardContent>
								</Card>

								<Grid container spacing={1}>
									{present.options.map((option,index) => {
                                        const val=present._id
										return (
											<>
												{choose[val] === index + 1 ? (
													<>
														<Grid item xs={6}>
															<Card
																variant="outlined"
																style={{
																	marginTop:
																		"1em",
																	backgroundColor:
																		"rgba(173,255,47,0.2)",
																}}
																onClick={() => {
																	setChoose(
																		(
																			prev
																		) => {
																			return {
																				...prev,
																				[present._id]:
																					index +
																					1,
																			};
																		}
																	);
																}}
															>
																<CardContent>
																	<Typography
																		variant="body2"
																		component="p"
																	>
																		{`${
																			index +
																			1
																		}.)     ${option}`}
																	</Typography>
																</CardContent>
															</Card>
														</Grid>
													</>
												) : (
													<>
														<Grid item xs={6}>
															<Card
																variant="outlined"
																style={{
																	marginTop:
																		"1em",
																}}
																onClick={() => {
																	setChoose(
																		(
																			prev
																		) => {
																			return {
																				...prev,
																				[present._id]:
																					index +
																					1,
																			};
																		}
																	);
																}}
															>
																<CardContent>
																	<Typography
																		variant="body2"
																		component="p"
																	>
																		{`${
																			index +
																			1
																		}.)     ${option}`}
																	</Typography>
																</CardContent>
															</Card>
														</Grid>
													</>
												)}
											</>
										);
									})}
								</Grid>
							</>
						) : (
							<></>
						)}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Test;
