import React from "react";
import { InfoContext } from "../App";
import LoopIcon from "@material-ui/icons/Loop";
import MuiAlert from "@material-ui/lab/Alert";
import {
	Container,
	Grid,
	Typography,
	Card,
	CardContent,
    Button
} from "@material-ui/core";
import {Link} from 'react-router-dom'
function Admin() {
	const [d1, setD1] = React.useState();
	const [d2, setD2] = React.useState();
	const [option, setOption] = React.useState({ name: "Profile", option: 1 });
	const [err, setErr] = React.useState();
	const { state } = React.useContext(InfoContext);

	const options = [
		{ name: "Profile", option: 1 },
		{ name: "My Test", option: 2 },
		{ name: "Attempted Test", option: 3 },
	];

	const CardOption = ({ V }) => {
		return (
			<>
				<Card
					variant="outlined"
					style={{
						marginTop: "1em",
						backgroundColor:
							option.option === V.option ? "lightgray" : "",
					}}
					onClick={(e) => {
						setOption(V);
					}}
				>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{`${V.option}. ${V.name}`}
						</Typography>
					</CardContent>
				</Card>
			</>
		);
	};
	const Column = ({ a, b }) => {
		return (
			<>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={6}>
							<Typography align="center" variant="h6">
								{a}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="body1">{b}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</>
		);
	};
	const Profile = () => {
		return (
			<>
				<Container>
					<Grid container direction="column" spacing={2}>
						<Typography
							align="center"
							variant="h6"
							color="textSecondary"
						>
							General
							<hr style={{ width: "20%" }} />
						</Typography>
						<Column a={"Name"} b={d1.userinfo.name} />
						<Column a={"Email"} b={d1.userinfo.email} />
						<Column a={"Registered"} b={d1.userinfo.createdOn} />
						<Typography
							align="center"
							variant="h6"
							color="textSecondary"
						>
							Combat Details
							<hr style={{ width: "20%" }} />
						</Typography>
						<Column a={"Won"} b={d1.combat.fightWon} />
						<Column a={"Fought"} b={d1.combat.fightFought} />
						<Typography
							align="center"
							variant="h6"
							color="textSecondary"
						>
							Contest Details
							<hr style={{ width: "20%" }} />
						</Typography>
						<Column a={"Created"} b={d1.my_test.length} />
						<Column a={"Attempted"} b={d2.length} />
					</Grid>
				</Container>
			</>
		);
	};
	const MyTest = () => {
		return (
			<>
				<Container>
						{d1.my_test.map((t) => {
							return (
								<>
									<Card variant="outlined">
										<CardContent>
											<Typography
												gutterBottom
												align="center"
											>
												<b>{t.name}</b>
												<hr style={{ width: "40%" }} />
											</Typography>
											<br />
											<Grid container spacing={3}>
												<Grid item xs={12} md={6}>
													<Typography
														variant="body2"
														gutterBottom
													>
														Created On:
														<br />
														{` ${t.createdOn}`}
													</Typography>
												</Grid>
												<Grid item xs={12} md={6}>
													<Typography
														variant="body2"
														gutterBottom
													>
														JoinId:
														<br />
														{` ${t.joinID}`}
													</Typography>
												</Grid>
												<Grid item xs={12} md={6}>
													<Typography
														variant="body2"
														gutterBottom
													>
														Participants:
														<br />
														{` ${t.attendes.length}`}
													</Typography>
												</Grid>
												<Grid item xs={12} md={6}>
													<Button
														variant="contained"
														color="primary"
													>
														<Link
															to="newTest"
															style={{
																color: "white",
															}}
														>
															EDIT
														</Link>
													</Button>
												</Grid>
											</Grid>
										</CardContent>
									</Card>
									<br />
								</>
							);
						})}
				</Container>
			</>
		);
	};
    const AttemptedTest = () => {
		return (
			<>
				<Container>
					{d2.map((t) => {
						return (
							<>
								<Card variant="outlined">
									<CardContent>
										<Grid container spacing={3}>
											<Grid item xs={12} md={6}>
												<Typography
													gutterBottom
													align="center"
												>
													<b>{t.name}</b>
												</Typography>
											</Grid>
											<Grid item xs={12} md={6}>
												<Typography
													variant="body2"
													gutterBottom
												>
													JoinId:
													<br />
													{` ${t.joinID}`}
												</Typography>
											</Grid>
											<Grid item xs={12} md={6}>
												<Typography
													variant="body2"
													gutterBottom
                                                    align="center"
												>
													Score:
													<br />
													{` ${t.score}`}
												</Typography>
											</Grid>
											<Grid item xs={12} md={6}>
												<Button
													variant="contained"
													color="primary"
												>
													<Link
														to={`/test/${t.joinID}`}
														style={{
															color: "white",
														}}
													>
														Leaderboard
													</Link>
												</Button>
											</Grid>
										</Grid>
									</CardContent>
								</Card>
                                <br/>
							</>
						);
					})}
				</Container>
			</>
		);
	};
	React.useEffect(() => {
		const f1 = async () => {
			const req = await fetch(`/api/user`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${state.token}`,
				},
			});
			const data = await req.json();
			if (data.error) {
				setErr(data.err);
			} else {
				setD1(data.payload);
			}
		};
		const f2 = async () => {
			const req = await fetch(`/api/my_test_data`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${state.token}`,
				},
			});
			const data = await req.json();
			if (data.error) {
				setErr(data.err);
			} else {
				setD2(data.payload);
			}
		};
		f1();
		f2();
	}, []);
	return (
		<>
			{err ? (
				<MuiAlert style={{ margin: "0.5em" }} severity="error">
					{err}
				</MuiAlert>
			) : (
				<></>
			)}
			{d1 ? (
				<>
					<Container>
						<Grid container spacing={2}>
							<Grid item xs={12} md={3}>
								<Grid container>
									{options.map((op) => {
										return (
											<>
												<Grid item xs={12}>
													<CardOption V={op} />
												</Grid>
											</>
										);
									})}
								</Grid>
							</Grid>
							<Grid item xs={12} md={9}>
								<div
									style={{ marginTop: "1em", height: "100%" }}
								>
									<Card variant="outlined">
										<CardContent>
											<Typography
												color="textSecondary"
												align="center"
												variant="h4"
											>
												{`${option.name}`}
												<Container>
													<hr />
												</Container>
											</Typography>
											{option.option === 1 ? (
												<>
													<Profile />
												</>
											) : option.option === 2 ? (
												<>
													<MyTest />
												</>
											) : (
												<><AttemptedTest/></>
											)}
										</CardContent>
									</Card>
								</div>
							</Grid>
						</Grid>
					</Container>
				</>
			) : (
				<>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "10%",
						}}
					>
						<LoopIcon style={{ fontSize: "10em" }} />
					</div>
				</>
			)}
		</>
	);
}

export default Admin;
