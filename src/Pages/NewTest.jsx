import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, Container } from "@material-ui/core";
import Dialog from "../Components/TestCreate/Dialog";
import { InfoContext } from "../App";
import Question from "../Components/TestCreate/Question";
import AddNewQuestion from "../Components/TestCreate/AddNewQuestion";
const dummy = {
	_id: "6068529ae27eb1053087735e",
	joiningID: "bd5ce0fe-7416-4888-a969-8aeb31ea098c",
	name: "First Test",
	questions: [
		{
			options: ["phela nasha", "hello world", "all is well", "os labs"],
			_id: "606856e11453ac25b07d35dd",
			title: "First Question Added",
			statement: "jo karna hai wo kar de bhai",
			ans: 1,
		},
		{
			options: ["phela nasha", "hello world", "all is well", "os labs"],
			_id: "606856f41453ac25b07d35de",
			title: "Second Question Added",
			statement: "jo karna hai wo kar de bhai",
			ans: 1,
		},
	],
	owner: null,
	attendes: [],
	createdOn: "2021-04-03T11:33:46.329Z",
	__v: 2,
};
const Content = ({ testID, testData, token, setUpdate }) => {
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
				return;
			}
			setUpdate((prev) => {
				return prev + 1;
			});
		};
		getIncFight();
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
				<Typography
					variant="h5"
					component="h2"
					gutterBottom
					align="center"
					style={{ paddingTop: "1em" }}
				>
					{testData.name}
				</Typography>
				{testData.questions ? (
					<>
						{testData.questions.map((question) => {
							return (
								<Question
									id={question._id}
									title={question.title}
									statement={question.statement}
									options={question.options}
									ans={question.ans}
									handleRemove={handleRemove}
								/>
							);
						})}
					</>
				) : (
					<></>
				)}
				<div>
					<AddNewQuestion testID={testID} token={token} />
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
				/>
			)}
		</>
	);
}
