import React from 'react'
import MuiAlert from "@material-ui/lab/Alert";

function Alert1(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Alert({color,msg}) {
    return (
		<>
        <br/>
			<Alert1 severity={color}>{msg}</Alert1>
        <br/>
		</>
	);
}

export default Alert
