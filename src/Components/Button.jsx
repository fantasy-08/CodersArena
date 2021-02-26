import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
        marginLeft:0
	},
}));

export default function ButtonC({text,handleClick,color}) {
	const classes = useStyles();

	return (
		<>
			<Button
				variant="contained"
				color={color}
				className={classes.button}
				onClick={handleClick}
			>
				{text}
			</Button>
		</>
	);
}
