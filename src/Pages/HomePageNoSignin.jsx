import React from 'react'
import { Grid, Container, Typography } from "@material-ui/core";
import text from '../text (1).png'
import text1 from "../text (2).png";
import text2 from "../text (3).png";
import logo from '../Boringcoder.svg'

function HomePageNoSignin() {
    return (
		<>
			<Container>
				<Grid container>
					<Grid item xs={12} md={6}>
						<img
							src={logo} //"https://static-fastly.hackerearth.com/newton/static/images/developer-coding.svg"
							style={{
								width: "100%",
								height: "auto",
							}}
							alt="logo"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<img
							style={{
								paddingTop: "5em",
								maxWidth: "100%",
								height: "auto",
							}}
							src={text}
							alt=""
							srcset=""
						/>
						<img
							style={{
								paddingTop: "5em",
								maxWidth: "100%",
								height: "auto",
							}}
							src={text1}
							alt=""
							srcset=""
						/>
						<img
							style={{
								paddingTop: "5em",
								maxWidth: "100%",
								height: "auto",
							}}
							src={text2}
							alt=""
							srcset=""
						/>
					</Grid>
				</Grid>

				<Typography variant="h3" align="center">
					<img
						src="https://media1.giphy.com/media/gKHjdOoRutf5RTQsM7/giphy-preview.gif"
						height="100em"
						alt=""
						srcset=""
						style={{
							width: "5%",
							height: "5%",
						}}
					/>
				</Typography>
			</Container>
		</>
	);
}

export default HomePageNoSignin
