import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpcg-path-plug";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState("");

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
        // console.clear();
    }, []);

    const onClickHandler = async () => {
        if (!ref.current) {
            return;
        }

        iframe.current.srcdoc = html;

        const result = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                "process.env.NODE_ENV": '"production"',
                global: "window",
            },
        });

        iframe.current.contentWindow.postMessage(
            result.outputFiles[0].text,
            "*"
        );
    };

    const html = `<html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener("message", (event) => {
                    try {
                        eval(event.data);
                    } catch(error) {
                        const root = document.querySelector("#root");
                        root.innerHTML = '<div>' + error + '</div>';
                        throw error;
                    }
                }, false);
            </script>
        </body>
    </html>`;

    return (
        <div>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                cols={50}
                rows={20}
            ></textarea>
            <CodeEditor
                initialValue="const a = 1;"
                onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={onClickHandler}>SUBMIT</button>
            </div>
            <iframe
                ref={iframe}
                srcDoc={html}
                sandbox="allow-scripts"
                title="Unique iframe"
            ></iframe>
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
