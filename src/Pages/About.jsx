import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Typography,Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: "1em",
		marginBottom: "0.2em",
		padding: theme.spacing(1),
		color: " theme.palette.text.secondary",
	},
}));

export default function About() {
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
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Container>
							<Typography variant="h4" gutterBottom>
								About
							</Typography>
							<hr />
							<br />
							<Typography variant="body1" gutterBottom>
								CodeArena is a two player game to find the
								fastest coder. You can fight a random opponent
								of your skill level and improve your programming
								skill. You will be required to solve a problem
								in limited time, and whoever solves the problem
								first wins the game. Start the fight now!
								<br />
								<Typography variant="h6" gutterBottom>
									Guidelines
								</Typography>
								<ul>
									<li>
										Clicking on the Start Fight button will
										find a random opponent of your level and
										then you will enter the CodeArena where
										you have to solve the given problem
										before the time runs out or your
										opponent solves the problem.
									</li>
									<br />
									<li>
										If you leave the CodeArena before the
										opponent has solved, then the final
										result will be available later in
										History
									</li>
									<br />
									<li>
										You must get higher score than your
										opponent to win the fight. Partial
										scores are also counted in comparing the
										score with the opponent.
									</li>
									<br />
									<li>
										Players indulging in plagiarism would be
										removed from the leaderboard and they
										will be restricted from starting new
										fights.
									</li>
									<br />
									<li>
										The first player to fully solve the
										problem wins the fight, and the fight is
										over for the other opponent.
									</li>
									<br />
									<li>
										The maximum points and time given for a
										fight depends on the difficulty level on
										the problem.
									</li>
									<br />
									<li>
										On starting the fight, the system
										intelligently determines the opponent of
										same skill level and match is done to
										have a great fight.
									</li>
									<br />
									<li>
										You can view the activity log of the
										opponent in realtime in the CodeArena.
										This helps track what the opponent is
										doing.
									</li>
									<br />
									<li>
										For your name to appear on the
										leaderboard, you must win at least one
										fight. Copying and pasting of code is
										not allowed in the code editor during an
										active fight.
									</li>
								</ul>
							</Typography>
						</Container>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
