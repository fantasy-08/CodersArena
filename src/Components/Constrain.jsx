import React from 'react'

import Typography from "@material-ui/core/Typography";

function Constrain({data}) {
    return (
		<>
			<Typography variant="h6" gutterBottom>
				Constrains
			</Typography>

			<>
				<ul>
					{data.map((val) => {
						return (
							<li>
								<Typography variant="body1" gutterBottom>
									{val}
								</Typography>
							</li>
						);
					})}
				</ul>
			</>
		</>
	);
}

export default Constrain
