import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Alert from "@material-ui/lab/Alert";
const INIT = {
	title: "",
	statement: "",
	options: [],
	ans: 0,
	temp: "",
};
export default function FormDialog({ testID, token }) {
	const [open, setOpen] = React.useState(false);
	const [val, setVal] = React.useState(INIT);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const [msg, setMsg] = React.useState();
	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = () => {
		if (val.ans > val.options.length) {
			setMsg("please choose correct value for answer (1 based indexing)");
			setVal((prev) => {
				return {
					...prev,
					ans: 0,
				};
			});
		} else {
			const submit = async () => {
				const parameter = {
					title: val.title,
					statement: val.statement,
					options: val.options,
					ans: val.ans,
				};
				const request = await fetch(`/api/${testID}/question`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(parameter),
				});

				const msg = await request.json();

				if (msg.error) {
					setMsg(msg.error);
					return;
				} else {
					setMsg(msg.message);

					setTimeout(() => {
						setVal(INIT);
						handleClose();
					}, 3000);
				}
			};
			submit();
		}
	};
	return (
		<>
			<Fab color="primary" aria-label="add" onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">ADD A QUESTION</DialogTitle>
				<DialogContent>
					{msg ? (
						<>
							<br />
							<Alert
								severity="info"
								onClose={() => {
									setMsg("");
								}}
							>
								{msg}
							</Alert>
							<br />
						</>
					) : (
						<></>
					)}
					<DialogContentText>
						Please fill with caution you can't edit it later.
					</DialogContentText>
					<label>Title</label>
					<TextField
						autoFocus
						placeholder="Title"
						name="title"
						value={val.title}
						onChange={(e) =>
							setVal((prev) => {
								return {
									...prev,
									[e.target.name]: e.target.value,
								};
							})
						}
						variant="outlined"
						fullWidth
					/>
					<br />
					<br />
					<label>Statement</label>
					<TextField
						autoFocus
						placeholder="Statement"
						name="statement"
						multiline
						rowsMax={4}
						rows={4}
						value={val.statement}
						onChange={(e) =>
							setVal((prev) => {
								return {
									...prev,
									[e.target.name]: e.target.value,
								};
							})
						}
						variant="outlined"
						fullWidth
					/>
					{val.options.length ? (
						<>
							<h5>Options</h5>
							<ol>
								{val.options.map((option) => {
									return (
										<>
											<li>
												{option}{" "}
												<IconButton
													aria-label="delete"
													onClick={() => {
														const temp = val.options.filter(
															(opt) =>
																opt !== option
														);
														setVal((prev) => {
															return {
																...prev,
																options: temp,
															};
														});
													}}
												>
													<DeleteIcon fontSize="small" />
												</IconButton>
											</li>
										</>
									);
								})}
							</ol>
						</>
					) : (
						<><br/><br/></>
					)}

					<label>Option</label>
					<OutlinedInput
						type="text"
						fullWidth
						placeholder="Add new Option"
						name="temp"
						value={val.temp}
						onChange={(e) => {
							setVal((prev) => {
								return {
									...prev,
									[e.target.name]: e.target.value,
								};
							});
						}}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={() => {
										if (val.temp === "") {
											return;
										}
										setVal((prev) => {
											var temp1 = prev.options;
											temp1.push(val.temp);
											return {
												...prev,
												temp: "",
												options: temp1,
											};
										});
									}}
									edge="end"
								>
									<AddCircleOutlineIcon />
								</IconButton>
							</InputAdornment>
						}
					/>
					<br />
					<br />
					<label>Answer</label>
					<TextField
						autoFocus
						placeholder="Answer"
						name="ans"
						type="number"
						value={val.ans}
						onChange={(e) =>
							setVal((prev) => {
								return {
									...prev,
									[e.target.name]: e.target.value,
								};
							})
						}
						variant="outlined"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setVal(INIT);
							setMsg("");
							handleClose();
						}}
						color="primary"
					>
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						ADD QUESTION
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
