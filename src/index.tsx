import { useEffect } from "react";
import ReactDOM from "react-dom";

import TextEditor from "./components/text-editor";

import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            // console.clear();
        }, 1500);
    }, []);

    return (
        <div>
            <TextEditor />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
