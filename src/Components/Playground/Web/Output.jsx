import React from "react";

function Output({ code }) {
  React.useEffect(() => {
    const iFrame = document.getElementById("iFrame").contentWindow.document;
    const htmlTextArea = code["html"];
    const cssTextArea = code["css"];
    const jsTextArea = code["js"];
    iFrame.open();
    iFrame.writeln(
      htmlTextArea.value +
        "<style>" +
        cssTextArea.value +
        "</style>" +
        "<script>" +
        jsTextArea.value +
        "</script>"
    );
    iFrame.close();
  }, [code]);

  return (
    <>
      <iframe id="iFrame" title="Output"></iframe>
    </>
  );
}

export default Output;
