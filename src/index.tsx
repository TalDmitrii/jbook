import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";

import { unpkgPathPlugin } from "./plugins/unpcg-path-plug";
import { fetchPlugin } from "./plugins/fetch-plugin";

import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";

import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
    const refESBuild = useRef<any>();
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");

    const startService = async () => {
        refESBuild.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
        console.clear();
    }, []);

    const onClickHandler = async () => {
        if (!refESBuild.current) {
            return;
        }

        const result = await refESBuild.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                "process.env.NODE_ENV": '"production"',
                global: "window",
            },
        });

        setCode(result.outputFiles[0].text);
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
