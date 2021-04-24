import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { InfoContext } from "../../App";
import MuiAlert from "@material-ui/lab/Alert";

export default function FormDialog() {
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = React.useState(0);
	const { state } = React.useContext(InfoContext);
	const [error, setError] = React.useState();
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [data, setData] = React.useState("");
	const isPresent = async (testID) => {
		setError();
		const token = state.token;
		const req = await fetch(`/api/${testID}/giveTest`, {
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		const d = await req.json();

		if (d.error && d.error !== "User already attempted the test") {
			setError(d.error);
			return false;
		}
		else return true;
	};
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
				{error ? (
					<>
						<MuiAlert style={{ margin: "0.5em" }} severity="error">
							{error}
						</MuiAlert>
					</>
				) : (
					<></>
				)}
				<DialogTitle id="form-dialog-title" align="center">
					Test ID
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<b>
							<u>Instructions</u>:
						</b>
						<ul>
							<li>
								Enter test ID to <b>give your test</b>
							</li>
							<li>
								To view the <b>Learderboard</b> simple enter
								test ID here and if you have attempted the test
								you will see the leaderboard
							</li>
						</ul>
						<br />
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						label="JoinID"
						variant="outlined"
						type="text"
						value={data}
						onChange={(e) => {
							setData(e.target.value);
						}}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						onClick={async () => {
							setLoading(1);
							var valid =await isPresent(data);
							if (valid) history.push(`/test/${data}`);
							else setLoading(0);
						}}
						variant="outlined"
						color="primary"
					>
						{loading !== 1 ? (
							"Enter Test/Result"
						) : (
							<CircularProgress disableShrink />
						)}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
