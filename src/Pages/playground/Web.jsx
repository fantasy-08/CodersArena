import React from "react";
import { Grid, Container } from "@material-ui/core";
import MyTab from "../../Components/Playground/Web/MyTab";
import { Playground } from "../../dummydata/languages";
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import './Web.css'

function Web() {
    const [code, setCode] = React.useState({ 'html': Playground["html"], 'css': '', 'js': Playground["javascript"] })
    const [run, setRun] = React.useState({ 'html': Playground["html"], 'css': '', 'js': Playground["javascript"] })
    const [value, setValue] = React.useState(0);
    return (
        <>
            <Grid alignItems="center" justify="center">
                <Grid item xs={12} md={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<PlayCircleOutlineIcon />}
                        id="run"
                        onClick={() => { setRun(code); setValue(3) }}
                    >
                        Run
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <MyTab code={code} setCode={setCode} run={run} value={value} setValue={setValue} />
                </Grid>
            </Grid>
        </>
    );
}

export default Web;
