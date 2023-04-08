import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";

import TextEditor from "./components/text-editor";

import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            // console.clear();
        }, 1500);
    }, []);

    return (
        <Provider store={store}>
            <div>
                <TextEditor />
            </div>
        </Provider>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
