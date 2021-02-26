import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 220,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const themes=[
    ["vs-dark",0],
    ["light",1]
]

function Option({ property, setProperty, title }) {
	const classes = useStyles();
	const handleLangChange = (e) => {
		const value = e.target.value;
		var Lang = "";
		themes.forEach((data) => {
			if (data[1] == value) {
				Lang = data[0];
				return null;
			}
		});
		setProperty((prev) => {
			return {
				...prev,
                theme:Lang
			};
		});
	};
	return (
		<>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">
					{title}
				</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value={property.theme==="light"?1:0}
					onChange={handleLangChange}
					label="Language"
				>
					{themes.map((data) => {
						return <MenuItem value={data[1]}>{data[0]}</MenuItem>;
					})}

				</Select>
			</FormControl>
		</>
	);
}

export default Option;
