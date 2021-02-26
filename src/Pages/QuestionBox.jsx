import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import QuestionPage from './questionPage';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: 0,
		backgroundColor: "#F2F2F2", //#F2F2F2EEEEEE
	},
	paper: {
		// width: "80%",
		marginTop: "2em",
		marginBottom: "2em",
		padding: theme.spacing(1),
		color: " theme.palette.text.secondary",
	},
}));

export default function QuestionBox({qID}) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
			>
				<Grid
					item
					xs={12}
				>
					<Paper className={classes.paper}>
						<QuestionPage qID={qID} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
