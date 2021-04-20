import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import LoopIcon from "@material-ui/icons/Loop";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import { Typography } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
	testID,
	testData,
	setUpdate,
	token,
}) {
	const [open, setOpen] = React.useState(false);
	const [public1, setPublic] = React.useState();
    
	const handleClose = () => {
		setOpen(false);
	};
    const handleCloseUpdate = () => {
        setUpdate(prev=>{return prev+1})
		setOpen(false);
	};
    React.useEffect(()=>{
        // console.log(testData)
        setPublic(!testData.isPublic)
    },[testData])
	const [loading, setLoading] = React.useState(false);

	const handlePublicUpdate = () => {
		setLoading(true);
		const APIClass = async () => {
			const req = await fetch(`/api/public/test/${testID}`, {
				method: "PUT",
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			const data = await req.json();
			if (data.error) {
				console.log(data.error);
				return;
			}
			setLoading(false);
            setPublic(prev=>{return !prev})            
		};
		APIClass();
	};
	return (
		<div>
			<IconButton
				color="primary"
				onClick={() => {
					setOpen(true);
				}}
				component="span"
				style={{ paddingTop: "1.0em" }}
			>
				<SettingsIcon />
			</IconButton>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle style={{ textAlign: "center" }}>
					<span>
						<SettingsIcon />
					</span>
					<br />
					{"Settings "}
					<br />
				</DialogTitle>
				<DialogContent>
					Here you can change the settings of your TEST <br />
					<br />
					<DialogContentText style={{ color: "black" }}>
						<Grid container>
							<Grid item xs={6}>
								<Typography
									variant="body2"
									component="h2"
									align="center"
									style={{ marginTop: ".7em" }}
								>
									OPEN TEST
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<Switch
									checked={public1}
									onChange={handlePublicUpdate}
									color="primary"
									name="checkedB"
									inputProps={{
										"aria-label": "primary checkbox",
									}}
								/>
							</Grid>
						</Grid>
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary"
						variant="outlined"
					>
						Close
					</Button>
					{loading ? (
						<Button
							onClick={handleCloseUpdate}
							color="primary"
							variant="outlined"
						>
							<LoopIcon/>
						</Button>
					) : (
						<Button
							onClick={handleCloseUpdate}
							color="primary"
							variant="outlined"
						>
							Apply
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
