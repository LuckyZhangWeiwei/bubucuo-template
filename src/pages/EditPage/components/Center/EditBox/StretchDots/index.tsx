import {
    recordCanvasChangeHistoryForDis,
    updateAssemblyCmpsByDistance,
} from "src/store/editStore/editStore";
import { throttle } from "lodash";
import useZoomStore from "src/store/zoomStore/zoomStore";

interface IStretchProps {
    zoom: number;
    style: any;
}

export default function StretchDots(props: IStretchProps) {
    const { style } = props;
    const { width, height, transform } = style;
    const zoom = useZoomStore((state) => state.zoom);

    // 伸缩组件 style top left width height
    const onMouseDown = throttle((e) => {
        console.log(e);
        const direction = e.target.dataset.direction;
        if (!direction) return;
        e.preventDefault();
        e.stopPropagation();

        let startX = e.pageX;
        let startY = e.pageY;
        // 记录移动过程中的位置
        const move = (e) => {
            const moveingX = e.pageX;
            const moveingY = e.pageY;
            let changeX = moveingX - startX;
            let changeY = moveingY - startY;

            changeX = changeX * (100 / zoom);
            changeY = changeY * (100 / zoom);

            const newStyle: any = {};
            if (direction.includes("top")) {
                changeY = 0 - changeY;
                newStyle.top = -changeY;
            } else if (direction.includes("left")) {
                changeX = 0 - changeX;
                newStyle.left = -changeX;
            }
            Object.assign(newStyle, { width: changeX, height: changeY });
            updateAssemblyCmpsByDistance(newStyle);
            startX = moveingX;
            startY = moveingY;
        };
        const up = () => {
            recordCanvasChangeHistoryForDis();
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        };

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    }, 50);

    return (
        <>
            <div
                className="stretchDot"
                style={{
                    top: -6,
                    left: -6,
                    transform,
                    cursor: "nwse-resize",
                }}
                data-direction="top, left"
                onMouseDown={onMouseDown}
            />

            <div
                className="stretchDot"
                style={{
                    top: -6,
                    left: width / 2 - 6,
                    transform,
                    cursor: "row-resize",
                }}
                data-direction="top"
                onMouseDown={onMouseDown}
            />

            <div
                className="stretchDot"
                style={{
                    top: -6,
                    left: width - 6,
                    transform,
                    cursor: "nesw-resize",
                }}
                data-direction="top right"
                onMouseDown={onMouseDown}
            />

            <div
                className="stretchDot"
                style={{
                    top: height / 2 - 6,
                    left: width - 6,
                    transform,
                    cursor: "col-resize",
                }}
                data-direction="right"
                onMouseDown={onMouseDown}
            />

            <div
                className="stretchDot"
                style={{
                    top: height - 6,
                    left: width - 6,
                    transform,
                    cursor: "nwse-resize",
                }}
                data-direction="bottom right"
                onMouseDown={onMouseDown}
            />

            <div
                className="stretchDot"
                style={{
                    top: height - 8,
                    left: width / 2 - 6,
                    transform,
                    cursor: "row-resize",
                }}
                data-direction="bottom"
                onMouseDown={onMouseDown}
            />

            <div
                className="stretchDot"
                style={{
                    top: height - 8,
                    left: -6,
                    transform,
                    cursor: "nesw-resize",
                }}
                data-direction="bottom left"
                onMouseDown={onMouseDown}
            />
            <div
                className="stretchDot"
                style={{
                    top: height / 2 - 6,
                    left: -6,
                    transform,
                    cursor: "col-resize",
                }}
                data-direction="left"
                onMouseDown={onMouseDown}
            />
        </>
    );
}
