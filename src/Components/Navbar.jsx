import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { InfoContext } from "../App";
import {useHistory} from 'react-router-dom';
import CodeIcon from "@material-ui/icons/Code";
import TimerIcon from "@material-ui/icons/Timer";
import Timer from "react-compound-timer";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	time: {
		display: "none",
		alignItems: "center",
		alignContent: "center",
		paddingLeft: "1.0em",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

export default function PrimarySearchAppBar() {
	const { state, dispatch } = React.useContext(InfoContext);
	const classes = useStyles();
    const history=useHistory();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [time,setTime]=React.useState(false);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
    const handleEndTest=()=>{
        setTime(false);
        history.push("/end");
    }
	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>{state.joinID?`Join ID is ${state.joinID}`:"Find Fight to get joining info"}</MenuItem>
			{/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					aria-label="show 11 new notifications"
					color="inherit"
					onClick={handleEndTest}
				>
					<ExitToAppIcon />
				</IconButton>
				<p>End Test</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Session Info</p>
			</MenuItem>
		</Menu>
	);

    React.useEffect(()=>{
        if(state.createdOn===""){
			setTime(false);
			return null;
		}

        var T=state.createdOn;
        var t1=Date.parse(T);
        var t2=Date.now();
        var dif=t2-t1;

        dif=(dif)/(60000)

        if(dif<32){
           setTime(true);
        }
    },[state])

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<CodeIcon style={{ fontSize: "2em" }} />
					<Typography className={classes.title} variant="h6" noWrap>
						Boring Coder
					</Typography>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					{time ? <TimerIcon /> : <></>}
					<div className={classes.time}>
						<Typography variant="body1">
							{time ? (
								<Timer
									initialTime={32 * 60 * 1000}
									direction="backward"
								>
									{({ timerState }) => (
										<React.Fragment>
											<>
												<Timer.Minutes />:
												<Timer.Seconds />
											</>
										</React.Fragment>
									)}
								</Timer>
							) : (
								<></>
							)}
						</Typography>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<>
						{
							state.points?
							<>
								<h4>{state.points}</h4>
								<IconButton
									aria-label="show 17 new notifications"
									color="inherit"
								>
									<MonetizationOnIcon />
								</IconButton>
							</>:
							<></>
						}								
						</>
						{state.joinID !== "" && state.joinID !== "finding" ? (
							<IconButton
								aria-label="show 17 new notifications"
								color="inherit"
								onClick={handleEndTest}
							>
								<ExitToAppIcon />
							</IconButton>
						) : (
							<></>
						)}
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}
