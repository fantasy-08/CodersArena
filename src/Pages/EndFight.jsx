import React, { useContext } from "react";
import { InfoContext } from "../App";
import { Typography, Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function EndFight() {
    
    const history = useHistory();
    const { state,dispatch } = useContext(InfoContext);

	React.useEffect(() => {
		if(state.won==="won" || state.won==="lost")
			return null;
		const id=setInterval(()=>{
			const check=async()=>{
				const res = await fetch(`api/user/${state.joinID}`);
				const Data=await res.json();

				if(Data.error){
					dispatch({type:"ADD_WON",payload:"lost"});
					clearInterval(id);
				}
			}
			check();
		},1000*60)
	}, [])
	
    return (
		<Container
			style={{
				alignItems: "center",
				alignContent: "center",
				paddingTop: "7em",
			}}
		>
			{state.won === "won" ? (
				<Typography variant="h2" align="center">
					WINNER WINNER CHICKEN DINNER
				</Typography>
			) : state.won === "lost" ? (
				<Typography variant="h2" align="center">
					YOU LOST
				</Typography>
			) : (
				<Typography variant="h2" align="center">
					Result Pending
				</Typography>
			)}
			<br />
			{state.won === "won" ? (
				<Typography variant="h1" align="center">
					<img
						src="https://www.flaticon.com/svg/vstatic/svg/1021/1021202.svg?token=exp=1614497355~hmac=75b2dceb0fadba6770bd75186d3c1b4e"
						alt="winner"
						width="154"
						height="154"
					/>
				</Typography>
			) : state.won === "lost" ? (
				<Typography variant="h2" align="center">
					<img
						src="https://www.flaticon.com/svg/vstatic/svg/2297/2297321.svg?token=exp=1614497853~hmac=d2f88843bf462de96c318610aae01a17"
						alt="winner"
						width="154"
						height="154"
					/>
				</Typography>
			) : (
				<Typography variant="h2" align="center">
					<img
						src="https://www.flaticon.com/svg/vstatic/svg/3296/3296327.svg?token=exp=1614497936~hmac=761fe6557ac2d832d4e91cc2bac892a6"
						alt="winner"
						width="154"
						height="154"
					/>
				</Typography>
			)}

			<br />
			<Typography variant="h2" align="center">
				<Button
					variant="contained"
					size="large"
					color="primary"
					onClick={() => {
						history.push("/expired");
					}}
				>
					Fing new fight
				</Button>
			</Typography>   
		</Container>
	);
}

export default EndFight
