import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {  Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Dialog1 from './Dialog';

const useStyles = makeStyles({
	root: {
		maxWidth: 450,
	},
	media: {
		height: 250,
	},
});

export default function MediaCard({loc,title,img,popup}) {
	const classes = useStyles();
    let history = useHistory();
    const handleClick=()=>{
        history.push(loc)
    }
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia className={classes.media} image={img} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					></Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				{popup === true ? (
					<>
						<Dialog1/>
					</>
				) : (
					<Button size="small" color="primary" onClick={handleClick}>
						Open
					</Button>
				)}
			</CardActions>
		</Card>
	);
}
