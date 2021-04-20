import React from "react";
import {
	Grid,
	Typography,
	Card,
	CardContent,
	Container,
	Button,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { InfoContext } from "../App";
import IconButton from "@material-ui/core/IconButton";
import BKICON from "@material-ui/icons/Bookmark";
import NBKICON from "@material-ui/icons/BookmarkBorder";
import Timer from "../Components/TestPage/Timer";
import Exit from "../Components/TestPage/EndTestDialog";
import { useHistory } from "react-router-dom";
function Test() {
	const history = useHistory();

	const { testID } = useParams();
	const [data, setData] = React.useState();
	const { state } = React.useContext(InfoContext);
	const [present, setPresent] = React.useState();
	const [choose, setChoose] = React.useState({});
	const [bookmarked, setBookmarked] = React.useState([]);
	const [endTest, setEndTest] = React.useState(false);

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
			if (d.error === "User already attempted the test"){
				setEndTest(true)
			}
				if (d.message) {
					setData(d.message);
					setPresent(d.message[0]);
				}

		};
		getIncFight();
	}, [state.token]);

	const handleSelect = (e) => {
		setPresent(e);
	};
	const handleChange = (id, v) => {
		if (v) {
			setBookmarked((prev) => {
				prev.push(id);
				return prev;
			});
		} else {
			setBookmarked((prev) => {
				prev.pop(id);
				return prev;
			});
		}
	};
	const handleExit = () => {
		setEndTest(true);
	};
	React.useEffect(() => {
		if (endTest === true) {
			
			const submitTest = async()=>{
				const parameter = choose;
				const request = await fetch(`/api/${testID}/evaluate`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						authorization: `Bearer ${state.token}`,
					},
					body: JSON.stringify(parameter),
				});
				const result=await request.json();
				if(result.error)
				{
					console.log("error submitting result")
					return null;
				}
				console.log(result)
				history.push(`/leaderboard/${testID}`);
			}
			submitTest();
			setData();
		}
	}, [endTest]);

	return (
		<>
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Typography
							variant="h4"
							component="h2"
							gutterBottom
							align="center"
							style={{ paddingTop: ".5em" }}
						>
							{data.name}
						</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<Exit handleExit={handleExit} />
					</Grid>
					<Grid item xs={3}>
						{data ? (
							<>
								{data.map((ques) => {
									return (
										<>
											<Card
												variant="outlined"
												style={{
													marginTop: "1em",
													backgroundColor:
														ques === present
															? "lightgrey"
															: bookmarked.indexOf(
																	ques._id
															  ) !== -1
															? "lightpink"
															: choose[ques._id]
															? "rgba(173,255,47,0.2)"
															: "",
												}}
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
								>
									<CardContent>
										<Grid container>
											<Grid item xs={6}>
												<Typography
													variant="h5"
													component="h2"
												>
													{present.title}
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<IconButton
													onClick={() => {
														const val =
															bookmarked.indexOf(
																present._id
															) === -1
																? true
																: false;
														handleChange(
															present._id,
															val
														);
													}}
												>
													{bookmarked.indexOf(
														present._id
													) === -1 ? (
														<NBKICON />
													) : (
														<BKICON />
													)}
												</IconButton>
											</Grid>
										</Grid>
										<Typography
											variant="body2"
											component="p"
										>
											{present.statement}
										</Typography>
									</CardContent>
								</Card>
								<Grid container spacing={1}>
									{present.options.map((option, index) => {
										const val = present._id;
										return (
											<>
												<Grid item xs={6}>
													<Card
														variant="outlined"
														style={{
															marginTop: "1em",
															backgroundColor:
																choose[val] ===
																index + 1
																	? "rgba(173,255,47,0.2)"
																	: "",
														}}
														onClick={() => {
															setChoose(
																(prev) => {
																	if (
																		prev[
																			present
																				._id
																		] &&
																		prev[
																			present
																				._id
																		] ===
																			index +
																				1
																	) {
																		return {
																			...prev,
																			[present._id]: 0,
																		};
																	}
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
																	index + 1
																}.)     ${option}`}
															</Typography>
														</CardContent>
													</Card>
												</Grid>
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
			{data && data.length ? (
				<Timer testID={testID} handleExit={handleExit} />
			) : (
				<></>
			)}
		</>
	);
}

export default Test;
