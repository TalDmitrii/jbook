import { useEffect } from "react";
import ReactDOM from "react-dom";

import CodeCell from "./components/code-cell";

import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            // console.clear();
        }, 1500);
    }, []);

    return (
        <div>
            <CodeCell />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
