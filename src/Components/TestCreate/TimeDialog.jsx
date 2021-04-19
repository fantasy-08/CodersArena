import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ testID, testData, setUpdate,token }) {
	const [open, setOpen] = React.useState(false);
    const [time,setTime]=React.useState()
    React.useEffect(()=>{
        setTime(testData.time);
    },[])
	const handleClose = () => {
		setOpen(false);
	};
    const [loading,setLoading]=React.useState(false);
    const handleUpdate=()=>{
        setLoading(true);
        if(time===testData.time){
            setLoading(false);
            handleClose();
            return ;
        }

        const APIClass=async ()=>{
            const req = await fetch(`/api/test_time/${testID}/${time}`, {
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
            handleClose();
			setUpdate((prev) => {
				return prev + 1;
			});
		}

        APIClass();
    }
	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				endIcon={<AccessTimeIcon />}
				style={{ marginTop: "1.6em" }}
				onClick={() => {
					setOpen(true);
				}}
				size="small"
			>
				Set Time
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle style={{ textAlign:"center"}}>
					<span>
						<AccessTimeIcon />
					</span>
					<br />
					{"Set test Time "}
					<br />
				</DialogTitle>
				<DialogContent>
					<DialogContentText style={{color:"black"}}>
						{`Current time set: ${testData.time} minutes`}
					</DialogContentText>
					<br />
					<TextField
						label="Set Time"
						variant="outlined"
						type="number"
						value={time}
						onChange={(e) => {
							setTime(e.target.value);
						}}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
					{loading ? (
						<CircularProgress />
					) : (
						<Button onClick={handleUpdate} color="primary">
							Update Time
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
