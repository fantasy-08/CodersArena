import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function FormDialog() {
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = React.useState(0);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [data, setData] = React.useState("");
	let history = useHistory();
	return (
		<div>
			<Button color="primary" onClick={handleClickOpen}>
				Enter Test
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Test ID</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Enter Test ID to give your unique test!
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						label="JoinID"
						type="text"
						value={data}
						onChange={(e) => {
							setData(e.target.value);
						}}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => {
							setLoading(1);
							history.push(`/test/${data}`);
							setLoading(0);
							handleClose();
						}}
						color="primary"
					>
						{loading !== 1 ? (
							"Enter Test"
						) : (
							<CircularProgress disableShrink />
						)}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
