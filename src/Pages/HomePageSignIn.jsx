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
				<b>CHOOSE</b> FROM SERVICES WE OFFER				
			</Typography>

			<Container>
				<Grid
					container
					spacing={2}
					alignItems="center"
					justify="center"
				>
					<Grid item xs={12} md={3}>
						<Card
							loc="/combat"
							title="CODERS FIGHT"
							img="https://3qb9rm3ii1195ulba2zpd8yh-wpengine.netdna-ssl.com/wp-content/uploads/sites/2/2019/01/ezgif.com-video-to-gif-1.gif"
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<Card
							loc="/test"
							title="GIVE TEST/RESULT"
							img="http://gif-free.com/uploads/posts/2017-05/1494348515_spongebob-exam.gif"
							popup={true}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<Card
							loc="/newTest"
							title="CREATE TEST"
							img="https://visme.co/blog/wp-content/uploads/2020/03/animation-software-header.gif"
						/>
					</Grid>
				</Grid>
				<img
					src="https://media0.giphy.com/media/3oipPTHYlTpCw8oBBy/source.gif"
					width="150px"
					height="150px"
				/>
			</Container>
		</>
	);
}

export default HomePageSignIn;
