import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { InfoContext } from "../App";

function LoginRoute({ children, ...rest }) {
	const { state } = useContext(InfoContext);
    console.log(state.user)
	return (
		<Route
			{...rest}
			render={() => {
				return state.user !== "" ? children : children;
			}}
		/>
	);
}

export default LoginRoute;
