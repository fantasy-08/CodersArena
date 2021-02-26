import React from "react";
import Typography from "@material-ui/core/Typography";

function QuestionHeader({ content }) {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Problem
			</Typography>
			<Typography variant="body1" gutterBottom>
				{content}
				<br />
			</Typography>
		</>
	);
}

export default QuestionHeader;
