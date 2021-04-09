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
							img="https://3qb9rm3ii1195ulba2zpd8yh-wpengine.netdna-ssl.com/wp-content/uploads/sites/2/2019/01/ezgif.com-video-to-gif-1.gif"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card
							loc="/test"
							title="Give Test With ID"
							img="http://gif-free.com/uploads/posts/2017-05/1494348515_spongebob-exam.gif"
							popup={true}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card
							loc="/newTest"
							title="Create New Test"
							img="https://visme.co/blog/wp-content/uploads/2020/03/animation-software-header.gif"
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default HomePageSignIn;
