import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import QuestionPage from './questionPage';
import { InfoContext } from "../App";
import {useHistory} from 'react-router-dom'

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

export default function QuestionBox() {
	const classes = useStyles();
	const { state } = useContext(InfoContext);
	const history=useHistory();

	React.useEffect(()=>{
		var createdOn=state.createdOn;
		var start_date=Date.parse(createdOn);
		var today_date=Date.now();
		var diff=today_date-start_date;
		var min=parseInt(diff/(1000*60))
		console.log(min)
		if(min>32){
			history.push('/expired')
		}

	},[])
	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
			>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<QuestionPage qID={state.qID} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
