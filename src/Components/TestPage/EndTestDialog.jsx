import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(setEndTest) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				style={{ marginTop: "1.5em", float: "right" }}
				variant="contained"
				color="secondary"
				size="small"
				onClick={handleClickOpen}
				endIcon={<ExitToAppIcon />}
			>
				End Test
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-description"
						style={{ color: "black" }}
					>
						<b>Exit</b> only if you are <b>done</b> with your
						answers and is sure your answers are correct from your
						knowledge.
						<br />
						Once you exit a test <b>you cannot attempt it again</b>.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						NO I still want to try
					</Button>
					<Button
						onClick={()=>setEndTest(true)}
						color="secondary"
						autoFocuscolor="secondary"
					>
						Exit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
