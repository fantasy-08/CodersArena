import React,{useContext} from 'react'
import About from './About'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography, Container, Button, TextField } from "@material-ui/core";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import LoopIcon from "@material-ui/icons/Loop";
import {InfoContext} from '../App';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: 0,
		backgroundColor: "#F2F2F2", //#F2F2F2EEEEEE
	},
	paper: {
		marginTop: "1em",
		marginBottom: "0.2em",
		padding: theme.spacing(1),
		color: " theme.palette.text.secondary",
	},
	button: {
		margin: theme.spacing(0),
	},
}));
function JoinPage() {
	const { state, dispatch } = useContext(InfoContext);
    const classes = useStyles();
    const handleFight=(e)=>{
        if(state.qID==="")
        {
			const uniID = uuidv4(); //generated to ID!
            const getFight=async ()=>{
                const req = await fetch(`api/user/${uniID}`,{
                    method:"POST"
                });
                const data=await req.json();
                console.log(data)
                if(data.user){
                    console.log(data.user.question._id);
					dispatch({
						type: "ADD_INFO",
						payload: {
							qID: data.user.question._id,
							createdOn: data.user.createdOn,
							joinID: uniID,
						},
					});
                }
            }
			dispatch({
				type: "ADD_qID",
				payload: "finding",
			});
            getFight();
        }
        else
        {
            //start fight
			console.log(state);
        }
    }
    return (
		<div className={classes.root}>
			<Container>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Grid container spacing={7}>
								<Grid item xs={3}>
									<img
										src="https://static-fastly.hackerearth.com/static/fight_club/images/logo.svg"
										alt=""
										srcset=""
										width="154"
										height="154"
									/>
								</Grid>
								<Grid item xs={9}>
									<Grid container direction="column">
										<Grid item xs={12}>
											<Typography
												variant="h2"
												gutterBottom
											>
												BoringCoder
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<Grid container spacing={10}>
												<Grid item xs={6}>
													<Typography
														variant="h6"
														gutterBottom
													>
														Where coders fight!
													</Typography>
												</Grid>
												<Grid item xs={6}>
													<Button
														variant="contained"
														color="primary"
														onClick={handleFight}
														className={
															classes.button
														}
														endIcon={
															state.qID ===
															"finding" ? (
																<LoopIcon />
															) : (
																<SportsKabaddiIcon />
															)
														}
													>
														{state.qID === "" ||
														state.qID === "finding"
															? "Find "
															: "Start "}
														Fight
													</Button>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<About />
				</Grid>
			</Container>
		</div>
	);
}

export default JoinPage
