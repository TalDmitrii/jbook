import { useState } from "react";

import bundle from "../bundler";

import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizible from "./resizible";

const CodeCell = () => {
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");

    const onClickHandler = async () => {
        const output = await bundle(input);
        setCode(output);
    };

    return (
        <Resizible direction="vertical">
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                }}
            >
                <Resizible direction="horizontal">
                    <CodeEditor
                        initialValue="const a = 1; console.log(a)"
                        onChange={(value) => setInput(value)}
                    />
                </Resizible>
                <Preview code={code} />
            </div>
        </Resizible>
    );
};

export default CodeCell;
