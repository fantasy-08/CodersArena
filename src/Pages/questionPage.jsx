import React,{useState,useEffect} from 'react'
import Container from "@material-ui/core/Container";
import QuestionHeader from '../Components/QuestionHeader';
import QuestionBody from "../Components/QuestionBody";
import IOdata from '../Components/IOdata';
import Constrain from '../Components/Constrain';
import TableTestCase from '../Components/TableTestCase';
import Monaco from '../Components/Monaco';
import Loading from '../Components/Loading';

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

function QuestionPage({qID}) {
    const [question, setQuestion] = useState(initial_state);
	const [error,setError]=useState("");
    useEffect(() => {
		const getQuestion=async (qID)=>{
			const response = await fetch(
				`api/question/${qID}`
			);
			const data=await response.json();
			if(data.error)
				setError(data.error)
			else
				setQuestion(data)
		}
		getQuestion(qID);
    }, [])
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
					/>
				</Container>
			) : (
				<>
					<Loading />
				</>
			)}
		</>
	);
}

export default QuestionPage
