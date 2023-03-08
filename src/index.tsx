import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpcg-path-plug";

const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const onClickHandler = async () => {
        if (!ref.current) {
            return;
        }
        // const result = await ref.current.transform(input, {
        //     loader: "jsx",
        //     target: "es2015",
        // });
        const result = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()],
        });

        // console.log(result);
        setCode(result.outputFiles[0].text);
    };

    return (
        <div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                cols={100}
                rows={20}
            ></textarea>
            <div>
                <button onClick={onClickHandler}>SUBMIT</button>
            </div>
            <pre>{code}</pre>
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));