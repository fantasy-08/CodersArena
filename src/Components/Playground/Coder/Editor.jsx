import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Option from '../../Option';
import OptionTheme from "../../OptionTheme";
import { template, compilerArg_exp } from "../../../dummydata/languages";
import ButtonC from '../../Button';
import { CopyBlock, nord } from "react-code-blocks";
import { InfoContext } from "../../../App";
import {
    Checkbox,
    FormGroup,
    FormControlLabel,
    Collapse,
    TextField,
} from "@material-ui/core";
import Alert from '../../Alert';
import { store } from "react-notifications-component";

const initial_state = {
    lang: "cpp",
    code: 7,
    theme: "vs-dark",
};

const initial_output = {
    present: false,
    data: "",
    Short: "",
    Msg: ""
};

function Monaco() {
    const [property, setProperty] = useState(initial_state);
    const [compile, setCompile] = useState("");
    const [exp, setExp] = useState(false);
    const [output, setOutput] = useState(initial_output);
    const [isTemp, setIsTemp] = useState(true);
    const [program, setProgram] = useState(template[property.lang]);
    const [change, setChange] = useState(0);
    const { state } = React.useContext(InfoContext);

    const handleCompileSubmit = () => {
        setIsTemp(true);
        setOutput((prev) => {
            return {
                data: "Compiling...",
                present: true,
                Short: "warning",
                Msg: "Compiling code...",
            };
        });
        const calling = async (prog, data, ip) => {
            const parameter = {
                LanguageChoice: `${data.code}`,
                Program: prog,
                Input: ip,
                CompilerArgs: compilerArg_exp[data.lang],
            };

            const request = await fetch("/api/compile", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: `Bearer ${state.token}`
                },
                body: JSON.stringify(parameter),
                redirect: "follow",
            });

            const data_result = await request.json();
            setIsTemp(true);
            setOutput((prev) => {
                return {
                    data:
                        data_result.Errors !== null
                            ? data_result.Errors
                            : data_result.Result,
                    present: true,
                    Short: data_result.Errors !== null ? "error" : "success",
                    Msg:
                        data_result.Errors !== null
                            ? "Compilation Error"
                            : "Compiled succesffuly",
                };
            });

            console.log(data_result);
        };
        calling(program, property, compile);
    };

    useEffect(() => {
        if (output === initial_output) return null;
        if (isTemp === false) return null;
        console.log(output.Short);
        store.addNotification({
            title: `${output.Short}`,
            message: `${output.Msg}.`,
            type: `${output.Short === "warning" || output.Short === "success"
                    ? output.Short
                    : "danger"
                }`,
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 500,
                showIcon: true,
            },
        });
    }, [output])
    //component Did Mount
    useEffect(() => {
        setProperty(initial_state);
    }, []);

    return (
        <>
            <br />
            <Option
                property={property}
                setProperty={setProperty}
                title="Language"
            />
            <OptionTheme
                property={property}
                setProperty={setProperty}
                title="Theme"
            />
            <br />
            <hr />
            <Editor
                height="70vh"
                defaultLanguage="cpp"
                language={property.lang}
                defaultValue={template[property.lang]}
                theme={property.theme}
                onChange={(value, event) => {
                    setProgram(value);
                }}
            />

            <br />

            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={exp}
                            onChange={(e) => {
                                setExp((prev) => {
                                    return !prev;
                                });
                            }}
                            name="checkedA"
                        />
                    }
                    label="Custom Input"
                />
            </FormGroup>
            {exp ? <br /> : <></>}
            <Collapse in={exp} timeout="auto" unmountOnExit>
                <TextField
                    id="outlined-multiline-static"
                    label="Provide Input"
                    multiline
                    fullWidth
                    rows={4}
                    value={compile}
                    onChange={(e) => {
                        setCompile(e.target.value);
                    }}
                    variant="outlined"
                />
            </Collapse>
            {exp ? <br /> : <></>}
            <ButtonC
                text="Compile Run"
                handleClick={handleCompileSubmit}
                color="secondary"
            />

            <Collapse in={output.present} timeout="auto" unmountOnExit>

                <>
                    <Alert color={output.Short} msg={output.Msg} />
                    <CopyBlock
                        text={output.data}
                        theme={nord}
                        language="text"
                    />
                    <br />
                    <br />
                </>
            </Collapse>
        </>
    );
}


export default Monaco
