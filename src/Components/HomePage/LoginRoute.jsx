import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import HomePageNoSignUp from "../../Pages/HomePageNoSignin";
import HomePageSignIn from "../../Pages/HomePageSignIn";
function LoginRoute({ children,state, ...rest }) {
	return (
		<Route
			{...rest}
			render={() => {
				return state.user !== "" ? (
					<HomePageSignIn/>
				) : (
					<HomePageNoSignUp/>
				);
			}}
		/>
	);
}

export default LoginRoute;
