import { useRef, useEffect } from "react";

import "./preview.css";

interface PreviewProps {
    code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

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
        </div>
    );
};

export default Preview;
