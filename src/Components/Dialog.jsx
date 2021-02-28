import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { InfoContext } from "../App";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});
const Icon=({val})=>{
    return (
        <>
        {
            val==="finding"?
            <HourglassEmptyIcon style={{color:"orange"}}/>:
            val==="error"?
            <ClearIcon style={{color:"red"}}/>:
            val==="yes"?
            <CheckIcon style={{color:"green"}}/>:
            <></>
        }
        </>
    )
}

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export default function CustomizedDialogs() {
	const [open, setOpen] = React.useState(false);
    const [joinID,setJoinID]=React.useState('')
    const [data,setData]=React.useState();
    const [isPresent,setIsPresent]=React.useState("");
	const { dispatch } = React.useContext(InfoContext);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
    const handleJoin=()=>{
        dispatch({
			type: "FOUND_INFO",
			payload: {
				qID: data.user.question,
				createdOn: data.user.createdOn,
				joinID: data.user.joiningID,
			},
		});
		setJoinID('');
        handleClose();
    }

    const handleFight=()=>{
        setIsPresent("finding")
        const getAPI=async()=>{
            const res = await fetch(`api/user/${joinID}`);
            const Data=await res.json();

            if(Data.error){
                setIsPresent("error");
            }
            else{
                setData(Data);
                setIsPresent("yes");
            }
        }
        getAPI();
    }
	return (
		<div>
			<Button
				fullWidth
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
				Join using id
			</Button>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Join fight
				</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter{" "}
						<i>joinng id</i> and <b>FIGHT!</b>
						&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;May
						the <b>BEST</b> coder <b>WINS!</b>
						&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
					</Typography>
					<Typography gutterBottom align="center">
						<b>Peace Out</b>{" "}
						<span style={{ fontSize: "2em" }}>✌️</span>
					</Typography>
					<br />

					<TextField
						id="outlined-basic"
						label="joinID"
						variant="outlined"
						fullWidth
						value={joinID}
						onChange={(e) => {
							setJoinID(e.target.value);
						}}
						InputProps={{
							endAdornment: <Icon val={isPresent} />,
						}}
					/>
				</DialogContent>
				<DialogActions>
					{isPresent === "error" ||
					isPresent === "finding" ||
					isPresent === "" ? (
						<Button autoFocus onClick={handleFight} color="primary">
							Search
						</Button>
					) : (
						<Button autoFocus onClick={handleJoin} color="primary">
							Proceed
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
