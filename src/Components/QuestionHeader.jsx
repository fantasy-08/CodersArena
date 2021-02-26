import React from 'react'
import Typography from "@material-ui/core/Typography";

function QuestionHeader({content}) {
    return (
		<>
			<Typography variant="h3" gutterBottom align="center">
				{content}
				<hr />
			</Typography>
		</>
	);
}

export default QuestionHeader
