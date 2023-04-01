import { useState } from "react";
import ReactDOM from "react-dom";

import { bundle } from "./bundler";

import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";

import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");

    const onClickHandler = async () => {
        const output = await bundle(input);
        setCode(output);
    };

    return (
        <div>
            <CodeEditor
                initialValue="const a = 1;"
                onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={onClickHandler}>SUBMIT</button>
            </div>
            <Preview code={code} />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
