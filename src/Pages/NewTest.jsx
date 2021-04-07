import React from "react";
import { Typography, Container } from "@material-ui/core";
import Dialog from "../Components/TestCreate/Dialog";
import { InfoContext } from "../App";
import Question from "../Components/TestCreate/Question";
import AddNewQuestion from "../Components/TestCreate/AddNewQuestion";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Grid} from "@material-ui/core/"
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
            setTestID(false)
			setUpdate((prev) => {
				return prev + 1;
			});
		};
		subfun();
	};
	return (
		<>
			<Container>
				<Typography
					variant="h6"
					component="h2"
					align="center"
					style={{ paddingTop: "1em" }}
				>
					{`TestID ${testID}`}
				</Typography>
				<Button
					color="secondary"
					variant="contained"
					align="right"
					size="small"
					onClick={handleDelete}
				>
					Delete Test
				</Button>
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
							>
								Name Test
							</Button>
						</div>
					</>
				)}
				<Typography
					variant="h5"
					component="h2"
					gutterBottom
					align="center"
					style={{ paddingTop: "1em" }}
				>
					Test Name: {testData.name}
				</Typography>
				{testData.questions > 0 ? (
					<>
						<Grid container>
							{testData.questions.map((question) => {
								return (
									<>
										<Grid item xs={6}>
											<Question
												id={question._id}
												title={question.title}
												statement={question.statement}
												options={question.options}
												ans={question.ans}
												handleRemove={handleRemove}
											/>
										</Grid>
									</>
								);
							})}
						</Grid>
					</>
				) : (
					<>
						<Typography
							variant="h3"
							component="h2"
							gutterBottom
							align="center"
							style={{ paddingTop: "1em" }}
						>
							Create your first question
						</Typography>
					</>
				)}
				<div>
					<AddNewQuestion
						testID={testID}
						token={token}
						setUpdate={setUpdate}
					/>
					<br />
					<br />
				</div>
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
