import React from 'react'
import { Grid, Container, Typography } from "@material-ui/core";
import text from '../text (1).png'
import text1 from "../text (2).png";
import text2 from "../text (3).png";
function HomePageNoSignin() {
    return (
		<>
			<Container>
				<Grid container>
					<Grid item xs={6}>
						<img
							style={{ paddingTop: "5em" }}
							src={text}
							alt=""
							srcset=""
						/>
						<img
							style={{ paddingTop: "5em" }}
							src={text1}
							alt=""
							srcset=""
						/>
						<img
							style={{ paddingTop: "5em" }}
							src={text2}
							alt=""
							srcset=""
						/>
					</Grid>
					<Grid item xs={6}>
						<img
							style={{ paddingTop: "5em" }}
							src="https://static-fastly.hackerearth.com/newton/static/images/developer-coding.svg"
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
					/>
				</Typography>
			</Container>
		</>
	);
}

export default HomePageNoSignin