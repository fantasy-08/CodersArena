import React from "react";

function Output({ code }) {
  React.useEffect(() => {
    const iFrame = document.getElementById("iFrame").contentWindow.document;
    const htmlTextArea = code["html"];
    const cssTextArea = code["css"];
    const jsTextArea = code["js"];
    iFrame.open();
    iFrame.writeln(
      htmlTextArea +
        "<style>" +
        cssTextArea +
        "</style>" +
        "<script>" +
        jsTextArea +
        "</script>"
    );
    iFrame.close();
  }, [code]);

  return (
    <>
      <iframe id="iFrame" title="Output" style={{width:'160vh',height:'70vh'}} sandbox ></iframe>
    </>
  );
}

export default Output;
