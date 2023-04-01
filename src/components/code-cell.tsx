import { useState } from "react";

import bundle from "../bundler";

import CodeEditor from "./code-editor";
import Preview from "./preview";

const CodeCell = () => {
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");

    const onClickHandler = async () => {
        const output = await bundle(input);
        setCode(output);
    };

    return (
        <div>
            <CodeEditor
                initialValue="const a = 1; console.log(a)"
                onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={onClickHandler}>SUBMIT</button>
            </div>
            <Preview code={code} />
        </div>
    );
};

export default CodeCell;
