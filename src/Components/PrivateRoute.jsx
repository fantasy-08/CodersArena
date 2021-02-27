import React, { useContext } from "react";
import { Route,Redirect } from "react-router-dom";
import { InfoContext } from "../App";

function PrivateRoute({children,...rest}) {
    const { state } = useContext(InfoContext);
    return (
        <Route {...rest} render={()=>{
            return state.qID !== "" && state.qID !== "finding" ?
            children:
            <Redirect to='/' />
        }}/>
    )
}

export default PrivateRoute
