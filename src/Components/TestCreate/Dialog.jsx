import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from '@material-ui/core/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ token, setTestID }) {
	const [open, setOpen] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState(false);
	const [localTest, setLocalTest] = React.useState();
	const [loading,setLoading]=React.useState(0);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCreate = () => {
		const getIncFight = async () => {
			setLoading(1);
			const req = await fetch(`/api/createTest`, {
				method: "POST",
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			const data = await req.json();
			setLoading(0);
			if (data.error) {
				setErrorMsg(data.error);
				return;
			}
			setTestID(data.testID);
			setLocalTest();
			handleClose();
		};
		getIncFight();
	};
	const handleHave = () => {
		const getIncFight = async () => {
			setLoading(2);
			const req = await fetch(`/api/test/${localTest}/owner`, {
				method: "GET",
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			const data = await req.json();
			setLoading(0);
			if (data.error) {
				setErrorMsg(data.error);
				return;
			}

			setTestID(localTest);
			setLocalTest();
			handleClose();
		};
		getIncFight();
	};

	return (
		<div>
			<Button
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
				Test ID
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				{errorMsg ? (
					<MuiAlert style={{ margin: "0.5em" }} severity="error">
						{errorMsg}
					</MuiAlert>
				) : (
					<></>
				)}

				<DialogTitle id="alert-dialog-slide-title">
					{"Enter/Create Test ID"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<b>
							<i>Instructions:</i>
						</b>
						<ul>
							<li>
								If you have a <b>test ID</b> enter here to have
								admin access and click <i>"I have One"</i> <b>button</b>
							</li>
							<li>
								If you want to create new <b>test</b> click
								<i>"Create New Test"</i> <b>button</b>
							</li>
						</ul>
					</DialogContentText>
					<TextField
						placeholder="Enter Test-ID/Create New"
						variant="outlined"
						onChange={(e) => {
							setLocalTest(e.target.value);
						}}
						fullWidth
					/>
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleCreate}
						color="primary"
						variant="outlined"
					>
						{loading !== 1 ? (
							"Create New Test"
						) : (
							<CircularProgress disableShrink />
						)}
					</Button>
					<Button
						onClick={handleHave}
						color="primary"
						variant="outlined"
					>
						{loading !== 2 ? (
							"I Have One"
						) : (
							<CircularProgress disableShrink />
						)}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
