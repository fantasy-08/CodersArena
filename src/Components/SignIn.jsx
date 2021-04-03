import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Switch, FormLabel } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { InfoContext } from "../App";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";

export default function FormDialog({design}) {
	const [open, setOpen] = React.useState(false);
	const { state, dispatch } = React.useContext(InfoContext);
	const [working, setWorking] = React.useState(false);
	const [signin, setSignin] = React.useState(true);
	const [error,setError]=React.useState({color:'',msg:''})
	const [prop, setProp] = React.useState({
		name: "",
		email: "",
		password: "",
	});
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		const signINF = async () => {
			if (signin) {
				setWorking(true)
				const param = {
					email: prop.email,
					password: prop.password,
				};
				const res = await fetch("/signin", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(param),
				});
				const data = await res.json();

				if (data.error) {
					setError({
						color: "error",
						msg: data.error,
					});
					
					setWorking(false);
				} else {
					console.log(data);
					dispatch({
						type: "ADD_USER",
						payload: { token: data.token, user: data.user },
					});
					localStorage.setItem("userData", JSON.stringify(data));
					setWorking(false);
					handleClose();
				}
			} else {
				const param = {
					name: prop.name,
					email: prop.email,
					password: prop.password,
				};
				const res = await fetch("/signup", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(param),
				});
				const data = await res.json();
				if (data.error) {
					setError({
						color: "error",
						msg: data.error,
					});
					setWorking(false);
				} else {
					setError({
						color: "success",
						msg: data.message,
					});
					setSignin(true);
					setWorking(false);
				}
			}
		};
		signINF();
	};
	return (
		<div>
			{design === "white" ? (
				<Button
					color="primary"
					onClick={handleClickOpen}
					endIcon={<LockOpenTwoToneIcon />}
					style={{ color: "white" }}
				>
					Sign In
				</Button>
			) : (
				<Button
					color="primary"
					onClick={handleClickOpen}
					endIcon={<LockOpenTwoToneIcon />}
				>
					Sign In
				</Button>
			)}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					{signin ? "Sign In " : "Sign Up "}
					<LockOpenTwoToneIcon />
				</DialogTitle>
				<DialogContent>
					{error.msg !== "" ? (
						<Alert severity={error.color}>{error.msg}</Alert>
					) : (
						<></>
					)}
					<DialogContentText>
						{signin ? "Log In Form" : "Sign Up Form"}
					</DialogContentText>
					{signin ? (
						<></>
					) : (
						<TextField
							autoFocus
							margin="dense"
							name="name"
							value={prop.name}
							label="Name"
							type="text"
							style={{ margin: ".5em 0" }}
							fullWidth
							onChange={(e) => {
								setProp((prev) => {
									return {
										...prev,
										[e.target.name]: e.target.value,
									};
								});
							}}
							variant="outlined"
						/>
					)}
					<TextField
						autoFocus
						margin="dense"
						name="email"
						value={prop.email}
						style={{ margin: ".5em 0" }}
						label="Email Address"
						type="email"
						fullWidth
						onChange={(e) => {
							setProp((prev) => {
								return {
									...prev,
									[e.target.name]: e.target.value,
								};
							});
						}}
						variant="outlined"
					/>
					<TextField
						autoFocus
						margin="dense"
						name="password"
						value={prop.password}
						style={{ margin: ".5em 0" }}
						onChange={(e) => {
							setProp((prev) => {
								return {
									...prev,
									[e.target.name]: e.target.value,
								};
							});
						}}
						label="Password"
						type="password"
						fullWidth
						variant="outlined"
					/>
					<Switch
						checked={!signin}
						onChange={() => {
							setSignin(!signin);
						}}
						color="primary"
						name="checkedB"
						inputProps={{ "aria-label": "primary checkbox" }}
					/>

					<FormLabel component="legend">Sign Up</FormLabel>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					{!working ? (
						<Button onClick={handleSubmit} color="primary">
							{signin ? "Sign In" : "Sign Up"}
						</Button>
					) : (
						<>
							<Button onClick={handleSubmit} color="primary">
								<CircularProgress size={20} />
							</Button>
						</>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
