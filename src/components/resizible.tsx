import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizible.css";

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}

const Resizible: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setWindowWidth(window.innerWidth);
                setWindowHeight(window.innerHeight);

                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 200);
        };

        window.addEventListener("resize", listener);

        return () => {
            window.removeEventListener("resize", listener);
        };
    }, [width]);

    if (direction === "horizontal") {
        resizableProps = {
            className: "resize-horizontal",
            width: width,
            height: Infinity,
            resizeHandles: ["e"],
            minConstraints: [windowWidth * 0.2, Infinity],
            maxConstraints: [windowWidth * 0.75, Infinity],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            },
        };
    } else {
        resizableProps = {
            width: Infinity,
            height: 300,
            resizeHandles: ["s"],
            minConstraints: [Infinity, 200],
            maxConstraints: [Infinity, windowHeight * 0.9],
        };
    }

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizible;
