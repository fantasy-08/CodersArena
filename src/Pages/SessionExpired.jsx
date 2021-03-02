import React from 'react'
import {useHistory} from 'react-router-dom';
import { InfoContext } from "../App";
import GavelIcon from "@material-ui/icons/Gavel";
import Typography from "@material-ui/core/Typography";

function SessionExpired() {
    const history=useHistory();
    const [text,setText]=React.useState('removing');
    const { state,dispatch } = React.useContext(InfoContext);
    React.useEffect(()=>{
        const delreq=async()=>{
            const req = await fetch(`/api/user/${state.joinID}`, {
				method: "DELETE",
			});
            const data=await req.json();
            console.log(data);
            setText(data.message);
			
			dispatch({
				type: "ADD_INFO",
				payload: {
					qID: "",
					createdOn: "",
					joinID: "",
				},
			});
			dispatch({
				type: "ADD_POINTS",
				payload:0
			});
			dispatch({
				type: "ADD_WON",
				payload: "",
			});
        }
		delreq();
		

		setTimeout(() => {
			history.push("/");
		}, 3000);
    },[])
    return (
		<div
			style={{
				textAlign: "center",
				alignItems: "center",
				paddingTop: "9em",
			}}
		>
			<GavelIcon
				color="error"
				fontSize="large"
				style={{ fontSize: "10em" }}
			/>
			<br />
			<Typography variant="h1" gutterBottom>
				The session has expired!
			</Typography>
			<Typography variant="body" gutterBottom>
				{text}
			</Typography>
			<br/>
			<Typography variant="body" gutterBottom>
				{text === "removing" ? <></> : "Redirection to home-page"}
			</Typography>
		</div>
	);
}

export default SessionExpired
