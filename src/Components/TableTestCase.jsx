import React from 'react'

function TableTestCase({ sampleInput, sampleOutput }) {
	return (
		<>
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					border: "1px solid black",
				}}
			>
				<tr style={{ border: "1px solid black" }}>
					<th style={{ border: "1px solid black" }}>
						Sample Input
					</th>
					<th style={{ border: "1px solid black" }}>
						Sample Output
					</th>
				</tr>
				<tr style={{ border: "1px solid black" }}>
					<td style={{ border: "1px solid black" }}>
						{sampleInput}
					</td>
					<td style={{ border: "1px solid black" }}>
						{sampleOutput}
					</td>
				</tr>
			</table>
		</>
	);
}

export default TableTestCase
