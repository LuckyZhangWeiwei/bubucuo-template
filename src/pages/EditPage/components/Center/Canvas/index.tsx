// import {_Style} from "src/store/editStoreTypes";
import useEditStore, {
    clearCanvas,
    getCanvas,
} from "src/store/editStore/editStore";
import styles from "./index.module.less";
import Cmp from "../Cmp";
import { useEffect } from "react";
import { useCanvasId } from "src/utils/hooks";

export default function Canvas() {
    const { canvas, addCmp } = useEditStore();
    const { cmps, style } = canvas;
    const id = useCanvasId();

    useEffect(() => {
        id && getCanvas(id);
        !id && clearCanvas();
    }, [id]);

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        // 1.获取到拖拽元素数据
        const cmpDrag = JSON.parse(e.dataTransfer.getData("drag-cmp"));
        if (!cmpDrag) return;

        const endX = e.pageX;
        const endY = e.pageY;
        // 2.计算拖拽元素相对于画布的位置
        const canvasPos = {
            top: 114,
            left: (document.body.clientWidth - Number(style.width)) / 2,
        };
        const cmpX = endX - canvasPos.left;
        const cmpY = endY - canvasPos.top;

        cmpDrag.style.top = cmpY - cmpDrag.style.height / 2;
        cmpDrag.style.left = cmpX - cmpDrag.style.width / 2;
        // 3.添加组件
        addCmp(cmpDrag);
    };

    const allowDraop = (e) => {
        e.preventDefault();
    };
    console.log("canvas render", cmps); //sy-log

    return (
        <div
            onDrop={onDrop}
            onDragOver={allowDraop}
            id="canvas"
            className={styles.main}
            style={canvas.style}
        >
            {cmps.map((cmp, index) => (
                <Cmp cmp={cmp} key={cmp.key} zIndex={index} />
            ))}
        </div>
    );
}
