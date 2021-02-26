import React from 'react'
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";
import StorageIcon from "@material-ui/icons/Storage";
import LoopIcon from "@material-ui/icons/Loop";

function Icon({ status }) {
	return (
		<>
			{status === "AC" ? (
				<CheckCircleOutlineIcon style={{ color: "green" }} />
			) : status === "WA" ? (
				<CancelIcon color="error" />
			) : status === "RE" ? (
				<ErrorIcon color="error" />
			) : status === "Server Error" ? (
				<StorageIcon style={{ color: "orange" }} />
			) : (
				<LoopIcon color="primary" />
			)}
		</>
	);
}

export default Icon
