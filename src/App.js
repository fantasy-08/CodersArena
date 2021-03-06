import React, { useReducer, createContext, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import QuestionBox from "./Pages/QuestionBox";
import JoinPage from "./Pages/JoinPage";
import NewTest from "./Pages/NewTest";
import { reducer } from "./Reducer/info";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import LoginRoute from "./Components/LoginRoute";
import LoginRoute2 from "./Components/HomePage/LoginRoute";
import SessionExpired from "./Pages/SessionExpired";
import Admin from "./Pages/Admin";
import EndTest from "./Pages/EndFight";
import Test from "./Pages/Test";
import EndTestMCQ from "./Pages/EndTest";
import NavBar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ReactNotification from "react-notifications-component";
import ABT from "./Pages/AboutBoringCoder";
import PlaygroundHome from "./Pages/playground/home";
import PlaygroundWeb from "./Pages/playground/Web";
import PlaygroundCoder from "./Pages/playground/Coder";
import "react-notifications-component/dist/theme.css";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
const initialState = {
  name: "",
  qID: "",
  joinID: "",
  points: 0,
  won: "",
  user: "",
  token: "",
};

export const InfoContext = createContext();

function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : "#3f51b5";
  const mainSecondaryColor = darkState ? deepOrange[900] : "#ec407a";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const data = localStorage.getItem("userData");
    if (!data) return null;
    const val = JSON.parse(data);
    dispatch({
      type: "ADD_USER",
      payload: { token: val.token, user: val.user },
    });
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <InfoContext.Provider value={{ state, dispatch }}>
        <Router>
          <>
            <ReactNotification />
            <NavBar handleThemeChange={handleThemeChange} />
            <Route exact path="/combat" component={JoinPage} />
            <LoginRoute state={state} exact path="/admin">
              <Admin />
            </LoginRoute>
            <Route exact path="/about" component={ABT} />
            <PrivateRoute exact path="/fight">
              <QuestionBox />
            </PrivateRoute>
            <LoginRoute state={state} exact path="/newTest">
              <NewTest />
            </LoginRoute>
            <LoginRoute state={state} exact path="/playground/web">
              <PlaygroundWeb />
            </LoginRoute>
            <LoginRoute state={state} exact path="/playground/compiler">
              <PlaygroundCoder />
            </LoginRoute>
            <LoginRoute state={state} exact path="/playground">
              <PlaygroundHome />
            </LoginRoute>
            <LoginRoute state={state} exact path="/test/:testID">
              <Test />
            </LoginRoute>
            <LoginRoute state={state} exact path="/leaderboard/:testID">
              <EndTestMCQ />
            </LoginRoute>

            <LoginRoute2 exact state={state} path="/"></LoginRoute2>
            <PrivateRoute exact path="/end">
              <EndTest />
            </PrivateRoute>
            <Route exact path="/expired" component={SessionExpired} />
          </>
        </Router>
      </InfoContext.Provider>
    </ThemeProvider>
  );
}

export default App;

//<QuestionBox qID="6037c8517ca56a1fb45fa829"/>
