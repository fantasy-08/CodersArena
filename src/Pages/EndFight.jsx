import React, { useContext } from "react";
import { InfoContext } from "../App";
import { Typography, Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import pending from '../pending.svg'
import lost from "../lost.svg";
import winner from "../winner.svg";
function EndFight() {
    
    const history = useHistory();
    const { state,dispatch } = useContext(InfoContext);

	React.useEffect(() => {
		if(state.won==="won" || state.won==="lost")
			return null;
		const id=setInterval(()=>{
			const check=async()=>{
				const res = await fetch(`/api/user/${state.joinID}`);
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
						src={winner}
						alt="winner"
						width="154"
						height="154"
					/>
				</Typography>
			) : state.won === "lost" ? (
				<Typography variant="h2" align="center">
					<img
						src={lost}
						alt="winner"
						width="154"
						height="154"
					/>
				</Typography>
			) : (
				<Typography variant="h2" align="center">
					<img
						src={pending}
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
					Find new fight
				</Button>
			</Typography>   
		</Container>
	);
}

export default EndFight
