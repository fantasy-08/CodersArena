import React,{useReducer,createContext} from 'react';
import QuestionBox from './Pages/QuestionBox';
import JoinPage from "./Pages/JoinPage";
import {reducer} from './Reducer/info';
import { BrowserRouter as Router,  Route } from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute';
import SessionExpired from './Pages/SessionExpired';
import NavBar from "./Components/Navbar";
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
			<Router>
				<>
          <NavBar/>
					<Route exact path="/" component={JoinPage} />
          <PrivateRoute exact path='/fight'>
            <QuestionBox/>
          </PrivateRoute>
          <Route exact path="/expired" component={SessionExpired}/>
				</>
			</Router>
		</InfoContext.Provider>
  );
}

export default App;


				
//<QuestionBox qID="6037c8517ca56a1fb45fa829"/>
				