import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Editor from "@monaco-editor/react";
import Output from "./Output"

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: "100%",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function MyTab({code,setCode,run,value,setValue}) {
    const classes = useStyles();
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                variant="fullWidth"
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="HTML" {...a11yProps(0)} />
                <Tab label="CSS" {...a11yProps(1)} />
                <Tab label="JavaScript" {...a11yProps(2)} />
                <Tab label="Output" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Editor
                    height="70vh"
                    width="160vh"
                    defaultLanguage="html"
                    language="html"
                    theme="vs-dark"
                    value={code["html"]}
                    onChange={(value, event) => { setCode((prev) => { return { ...prev, 'html': value } }) }}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Editor
                    height="70vh"
                    width="160vh"
                    defaultLanguage="css"
                    language="css"
                    theme="vs-dark"
                    value={code["css"]}
                    onChange={(value, event) => { setCode((prev) => { return { ...prev, 'css': value } }) }}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Editor
                    height="70vh"
                    width="160vh"
                    defaultLanguage="javascript"
                    language="javascript"
                    theme="vs-dark"
                    value={code["js"]}
                    onChange={(value, event) => { setCode((prev) => { return { ...prev, 'js': value } }) }}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Output code={run}/>
            </TabPanel>
        </div>
    );
}