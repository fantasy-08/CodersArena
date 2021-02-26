import React,{useReducer,createContext} from 'react';
import QuestionBox from './Pages/QuestionBox';
import JoinPage from "./Pages/JoinPage";
import {reducer} from './Reducer/info';

const initialState={
  name:"",
  qID:"",
  joinID:""
}

export const InfoContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
		<InfoContext.Provider value={{ state, dispatch }}>
			<>
				<JoinPage />
				{/* <QuestionBox qID="6037c8517ca56a1fb45fa829"/> */}
			</>
		</InfoContext.Provider>
  );
}

export default App;
