import React from 'react'
import Typography from "@material-ui/core/Typography";

function IOdata({content,title}) {
    return (
		<>
			<Typography variant="h6" gutterBottom>
				{title}
			</Typography>
			<Typography variant="body1" gutterBottom>
				{content}
				<br />
			</Typography>
		</>
	);
}

export default IOdata
