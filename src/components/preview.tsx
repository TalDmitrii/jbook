import { useRef, useEffect } from "react";

import "./preview.css";
import { log } from "console";

interface PreviewProps {
    code: string;
    errorMessage: string;
}

const html = `<html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                const handleError = (error) => {
                    const root = document.querySelector("#root");
                    root.innerHTML = '<div style="color: red;">' + error + '</div>';
                    throw error;
                }

                window.addEventListener("error", (event) => {
                    event.preventDefault();
                    handleError(event.error);
                });

                window.addEventListener("message", (event) => {
                    try {
                        eval(event.data);
                    } catch(error) {
                        handleError(error);
                    }
                }, false);
            </script>
        </body>
    </html>`;

const Preview: React.FC<PreviewProps> = ({ code, errorMessage }) => {
    const iframe = useRef<any>();
    console.log(errorMessage);

    useEffect(() => {
        iframe.current.srcdoc = html;

        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, "*");
        }, 50);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                ref={iframe}
                srcDoc={html}
                sandbox="allow-scripts"
                title="Unique iframe"
            />
            {errorMessage && (
                <div className="preview-error">{errorMessage}</div>
            )}
        </div>
    );
};

export default Preview;
