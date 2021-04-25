import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

export default function OutlinedCard({
	title,
	statement,
	options,
	ans,
	id,
	handleRemove,
}) {
	return (
		<>
			<Card variant="outlined">
				<CardContent>
					<Typography color="textSecondary" gutterBottom>
						Question ID {id}
					</Typography>
					<Typography variant="h5" component="h2">
						{title}
					</Typography>
					<Typography color="textSecondary">Answer {ans}</Typography>
					<Typography variant="body2" component="p">
						{statement}
					</Typography>
					<ol>
						{options.map((option) => {
							return <li>{option}</li>;
						})}
					</ol>
				</CardContent>
				<CardActions>
					<IconButton
						aria-label="delete"
						onClick={() => handleRemove(id)}
					>
						<DeleteIcon fontSize="large" />
					</IconButton>
				</CardActions>
			</Card>
			<br />
		</>
	);
}
