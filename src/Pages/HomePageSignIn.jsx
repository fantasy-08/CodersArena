import React from "react";
import { Typography,Grid,Container } from "@material-ui/core";
import Card from '../Components/HomePage/Card';

function HomePageSignIn() {
	return (
		<>
			<Typography
				variant="h4"
				align="center"
				style={{ paddingTop: "1em", paddingBottom: "1em" }}
			>
				Choose from services we offer!
			</Typography>

			<Container>
				<Grid
					container
					spacing={2}
					alignItems="center"
					justify="center"
				>
					<Grid item xs={12} md={5}>
						<Card
							loc="/combat"
							title="CoderFight"
							img="https://img.freepik.com/free-vector/raised-up-fist-red-fire-flame-silhouette-protest-demonstration-power-concept_148087-119.jpg?size=626&ext=jpg"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card
							loc="/test"
							title="Give Test With ID"
							img="https://www.litmus.com/wp-content/uploads/2021/02/animated-gif-man-in-motion.png"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card
							loc="/newTest"
							title="Create New Test"
							img="https://lh3.googleusercontent.com/proxy/pDBY1B5Cd5KancrFiK6lyEu0N3yWDU4UziULsZAV30pOnQ_wzWdirXaM2PrQLPfxutkyBHwnfxbhfvMpckViXZXSV9hW2vt-zZTL-gKEBPYNlcYfsWbeLjuUDQ"
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default HomePageSignIn;
