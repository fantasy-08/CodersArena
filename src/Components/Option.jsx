import React from 'react'
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { langOp } from "../dummydata/languages";
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
function Option({ property, setProperty,title }) {
    const classes = useStyles();
    const handleLangChange=(e)=>{
        const value=e.target.value;
        var Lang="";
        langOp.forEach(data=>{
            if(data[1]==value){
                Lang=data[0];
                return null;
            }
        })
        setProperty((prev)=>{
            return {
				...prev,
				code: value,
				lang:Lang
			};
        })
    }
	return (
		<>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">
					{title}
				</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value={property.code}
					onChange={handleLangChange}
					label="Language"
				>
					{langOp.map((data) => {
						return <MenuItem value={data[1]}>{data[0]}</MenuItem>;
					})}
				</Select>
			</FormControl>
		</>
	);
}

export default Option
