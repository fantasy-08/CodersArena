import React from "react";
import { Typography, Container } from "@material-ui/core";
import Dialog from "../Components/TestCreate/Dialog";
import { InfoContext } from "../App";
import Question from "../Components/TestCreate/Question";
import AddNewQuestion from "../Components/TestCreate/AddNewQuestion";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid, Card, CardContent } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import TimeDialog from '../Components/TestCreate/TimeDialog';
import Settings from "../Components/TestCreate/Settings";
const Content = ({ testID, testData, token, setUpdate, setTestID }) => {
	const handleRemove = (id) => {
		const getIncFight = async () => {
			const req = await fetch(`/api/${testID}/${id}`, {
				method: "DELETE",
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			const data = await req.json();
			if (data.error) {
				console.log(data.error);
				return;
			}
			setUpdate((prev) => {
				return prev + 1;
			});
		};
		getIncFight();
	};
	const [name, setName] = React.useState("");
	const [select, setSelect] = React.useState();
	const handleName = () => {
		const subfun = async () => {
			const req = await fetch(`/api/test_name/${name}/${testID}`, {
				method: "PUT",
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			const data = await req.json();
			if (data.error) {
				console.log(data.error);
				return;
			}
			setUpdate((prev) => {
				return prev + 1;
			});
		};
		subfun();
	};
	const handleDelete = () => {
		const subfun = async () => {
			const req = await fetch(`/api/${testID}`, {
				method: "DELETE",
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			const data = await req.json();
			if (data.error) {
				console.log(data.error);
				return;
			}
			setTestID(false);
			setUpdate((prev) => {
				return prev + 1;
			});
		};
		subfun();
	};
	const handleSelect = (ques) => {
		setSelect(ques);
		console.log(ques)
	};
	React.useEffect(() => {
		if (testData && testData.questions) {
			setSelect(testData.questions[0]);
		}
	}, [testData]);
	return (
		<>
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={12} md={3}>
						<Typography
							variant="h4"
							component="h2"
							gutterBottom
							align="center"
							style={{ paddingTop: ".5em" }}
						>
							{testData.name}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography
							variant="body2"
							component="h2"
							align="center"
							style={{ paddingTop: "1em", marginTop: "1em" }}
						>
							{`TestID ${testID}`}
						</Typography>
					</Grid>
					<Grid item xs={12} md={2}>
						<TimeDialog
							testID={testID}
							testData={testData}
							setUpdate={setUpdate}
							token={token}
						/>
					</Grid>
					<Grid item xs={12} md={2}>
						<Button
							color="secondary"
							variant="contained"
							size="small"
							onClick={handleDelete}
							style={{ marginTop: "1.6em" }}
						>
							Delete Test
						</Button>
					</Grid>
					<Grid item xs={12} md={2}>
						<Settings
							testID={testID}
							testData={testData}
							setUpdate={setUpdate}
							token={token}
						/>
					</Grid>
				</Grid>
				{testData.name ? (
					<></>
				) : (
					<>
						<div style={{ textAlign: "center", paddingTop: "1em" }}>
							<TextField
								placeholder="Enter Test Name"
								variant="outlined"
								size="small"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
							<Button
								color="primary"
								variant="contained"
								onClick={handleName}
								size="small"
								style={{ marginLeft: "1em", marginTop: ".2em" }}
							>
								Name Test
							</Button>
						</div>
					</>
				)}
				{testData &&
				testData.questions &&
				testData.questions.length > 0 ? (
					<>
						<Grid container spacing={2}>
							<Grid item xs={12} md={3}>
								<>
									{testData.questions.map((ques, index) => {
										return (
											<>
												<Card
													variant="outlined"
													style={{
														marginTop: "1em",
														backgroundColor:
															ques === select
																? "rgba(0,0,0,0.2)"
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
															{`${index + 1} ${
																ques.title
															}`}
															<span
																style={{
																	display:
																		"none",
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
									<br />
									<AddNewQuestion
										testID={testID}
										token={token}
										setUpdate={setUpdate}
									/>
								</>
							</Grid>
							<Grid item xs={12} md={9}>
								{select ? (
									<>
										<Card
											variant="outlined"
											style={{ marginTop: "1em" }}
										>
											<CardContent>
												<Typography
													variant="h5"
													component="h2"
												>
													{select.title}
												</Typography>
												<br />
												<Typography
													variant="body2"
													component="p"
												>
													{select.statement}
												</Typography>
											</CardContent>
										</Card>
										<br />
										<Grid container spacing={1}>
											{select.options.map(
												(option, index) => {
													return (
														<Grid item xs={6}>
															<Card
																variant="outlined"
																style={{
																	background:
																		select.ans ===
																		index +
																			1
																			? "lightgreen"
																			: "",
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
													);
												}
											)}
										</Grid>
										<br />
										<Button
											variant="contained"
											color="secondary"
											startIcon={<DeleteIcon />}
											onClick={() => {
												handleRemove(select._id);
											}}
										>
											Delete
										</Button>
									</>
								) : (
									<></>
								)}
							</Grid>
						</Grid>
					</>
				) : (
					<>
						<Typography
							variant="h3"
							component="h2"
							gutterBottom
							align="center"
						>
							<img
								src="https://miro.medium.com/max/2400/1*OicrRIgS2GlMkhzY7GIwOA.gif"
								height="400em"
							/>
							<br />
							{/* <img src="https://www.animatedimages.org/data/media/426/animated-button-image-0538.gif" /> */}
						</Typography>

						<AddNewQuestion
							testID={testID}
							token={token}
							setUpdate={setUpdate}
						/>
					</>
				)}
			</Container>
		</>
	);
};

const TestIDFind = ({ token, setTestID }) => {
	const centerDiv = {
		width: "100px",
		height: "100px",
		position: "absolute",
		top: "0",
		bottom: "0",
		left: "0",
		right: "0",
		margin: "auto",
	};
	return (
		<>
			<div style={centerDiv}>
				<Dialog token={token} setTestID={setTestID} />
			</div>
		</>
	);
};

export default function NewTest() {
	const [testID, setTestID] = React.useState(false);
	const [testData, setTestData] = React.useState({});
	const { state } = React.useContext(InfoContext);
	const [update, setUpdate] = React.useState(0);
	React.useEffect(() => {
		if (testID === false) return;
		const getIncFight = async () => {
			const req = await fetch(`/api/test/${testID}/owner`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${state.token}`,
				},
			});
			const data = await req.json();
			if (data.error) {
				return;
			}
			setTestData(data);
		};
		getIncFight();
	}, [state.token, testID]);
	React.useEffect(() => {
		if (testID === false) return;
		const getIncFight = async () => {
			const req = await fetch(`/api/test/${testID}/owner`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${state.token}`,
				},
			});
			const data = await req.json();
			if (data.error) {
				return;
			}
			setTestData(data);
		};
		getIncFight();
	}, [state.token, testID, update]);
	return (
		<>
			{testID === false ? (
				<TestIDFind token={state.token} setTestID={setTestID} />
			) : (
				<Content
					testID={testID}
					testData={testData}
					setUpdate={setUpdate}
					token={state.token}
					setTestID={setTestID}
				/>
			)}
		</>
	);
}
