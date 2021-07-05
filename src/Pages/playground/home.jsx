import React from "react";
import { Typography,Grid,Container } from "@material-ui/core";
import Card from '../../Components/HomePage/Card';

function HomePageSignIn() {
	return (
		<>
			<Typography
				variant="h4"
				align="center"
				style={{ paddingTop: "1em", paddingBottom: "1em" }}
			>
			</Typography>
			<Container>
				<Grid
					container
					spacing={2}
					alignItems="center"
					justify="center"
				>
					<Grid item xs={12} md={12}>
						<Card
							loc="/playground/web"
							title="Web"
							img="https://i.pinimg.com/originals/87/98/77/879877f9ddebaf63aa83976fe65a87ce.gif"
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default HomePageSignIn;
