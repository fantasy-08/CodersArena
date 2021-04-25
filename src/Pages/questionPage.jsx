import React, { useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import QuestionHeader from "../Components/QuestionHeader";
import QuestionBody from "../Components/QuestionBody";
import IOdata from "../Components/IOdata";
import Constrain from "../Components/Constrain";
import TableTestCase from "../Components/TableTestCase";
import Monaco from "../Components/Monaco";
import Loading from "../Components/Loading";
import useChat from "../Components/Socket";
import { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";
import { InfoContext } from "../App";
// import Timer from '../Components/CoderFight/Timer'

const initial_state = {
	title: "",
	statement: "",
	sampleInput: "",
	sampleOutput: "",
	constrian: [],
	testCaseSize: 0,
	joinID: "",
	inputF: "",
	outputF: "",
};

function QuestionPage({ qID, joinID }) {
	const [question, setQuestion] = useState(initial_state);
	const { messages, sendMessage } = useChat(joinID);
	const history = useHistory();
	const { state, dispatch } = useContext(InfoContext);
	const [testTime,setTestTime]=useState({present:false,time:0});
	const handleEndTest=()=>{
		console.log("over")
	}
	useEffect(() => {
		const getQuestion = async (qID) => {
			const response = await fetch(`/api/question/${qID}`);
			const data = await response.json();
			if (data.error) {
				store.addNotification({
					title: "API Error",
					message: data.error,
					type: "default",
					insert: "top",
					container: "top-right",
					animationIn: ["animate__animated", "animate__fadeIn"],
					animationOut: ["animate__animated", "animate__fadeOut"],
					dismiss: {
						duration: 4000,
						onScreen: true,
					},
				});
			} else {
				setQuestion(data);
			}
		};
		getQuestion(qID);
	}, []);

	// useEffect(() => {
	// 	if (state.createdOn === "") {
	// 		setTestTime(prev=>{return {...prev,present:false}});
	// 		return null;
	// 	}

	// 	var T = state.createdOn;
	// 	var t1 = Date.parse(T);
	// 	var t2 = Date.now();
	// 	var dif = t2 - t1;

	// 	dif = dif / 60000;

	// 	if (dif < 32) {
	// 		setTestTime(prev=>{return {present:true,time:dif}});
	// 	}

	// }, [state]);

	useEffect(() => {
		if (messages.length === 0) return null;
		if (
			messages[0].ownedByCurrentUser &&
			messages[0].body === "fight over"
		) {
			dispatch({ type: "ADD_WON", payload: "won" });
			history.push("/end");
		}

		if (messages[0].ownedByCurrentUser) return null;
		if (messages[0].body === "fight over") {
			dispatch({ type: "ADD_WON", payload: "lost" });
			history.push("/end");
		}
		store.addNotification({
			title: "Compilation Alert",
			message: messages[0].body,
			type: "default",
			insert: "top",
			container: "top-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: 4000,
				onScreen: true,
			},
		});
	}, [messages]);
	return (
		<>
			{question !== initial_state ? (
				<Container>
					<QuestionHeader content={question.title} />
					<QuestionBody content={question.statement} />
					<IOdata content={question.inputF} title="Input Format" />
					<IOdata content={question.outputF} title="Output Format" />
					<Constrain data={question.constrain} />
					<TableTestCase
						sampleInput={question.sampleInput}
						sampleOutput={question.sampleOutput}
					/>
					<Monaco
						sampleInput={question.sampleInput}
						qID={qID}
						testCaseSize={question.testCaseSize}
						sendMessage={sendMessage}
					/>
				</Container>
			) : (
				<>
					<Loading />
				</>
			)}
			{/* {testTime.present ? (
				<Timer timeT={testTime.time} handleEndTest={handleEndTest} />
			) : (
				<></>
			)} */}
		</>
	);
}

export default QuestionPage;
