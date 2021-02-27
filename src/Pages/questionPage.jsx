import React,{useState,useEffect} from 'react'
import Container from "@material-ui/core/Container";
import QuestionHeader from '../Components/QuestionHeader';
import QuestionBody from "../Components/QuestionBody";
import IOdata from '../Components/IOdata';
import Constrain from '../Components/Constrain';
import TableTestCase from '../Components/TableTestCase';
import Monaco from '../Components/Monaco';
import Loading from '../Components/Loading';
import useChat from "../Components/Socket";
import { store } from "react-notifications-component";

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

	useEffect(() => {
		const getQuestion = async (qID) => {
			const response = await fetch(`api/question/${qID}`);
			const data = await response.json();
			if (data.error){
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
			}
			else setQuestion(data);
		};
		getQuestion(qID);
	}, []);

	useEffect(() => {
		if(messages.length===0)
			return null;
		if(messages[0].ownedByCurrentUser)
			return null;
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
	}, [messages])
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

			<div className="messages-container">
				<ol className="messages-list">
					{messages.map((message, i) => (
						!message.ownedByCurrentUser?
						<li key={i}>
							{message.body}
						</li>:
						<></>
						))
					}
				</ol>
			</div>
			
		</>
	);
}

export default QuestionPage
