import React from "react";
import Icon from "./Icon";

function DisplayCase({
	qID,
	testCaseSize,
	code,
	prog,
	CompilerArgs,
	no,
	casestatus,
}) {
	const [status, setStatus] = React.useState("");

	React.useEffect(() => {
            setStatus(no);
	}, [no]);
	return (
		<>
			<tr style={{ border: "1px solid black" }}>
				<td
					style={{ border: "1px solid black", textAlign: "center" }}
				>{`Test Case ${casestatus + 1}`}</td>
				<td style={{ border: "1px solid black", textAlign: "center" }}>
					<Icon status={status} />
				</td>
				<td style={{ border: "1px solid black", textAlign: "center" }}>
					{status === "AC" ? 10 : 0}
				</td>
			</tr>
		</>
	);
}

export default DisplayCase;
