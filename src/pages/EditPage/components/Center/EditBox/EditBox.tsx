import { throttle } from "lodash";
import useEditStore, {
    updateAssemblyCmpsByDistance, updateSelectedCmpAttr, updateSelectedCmpStyle,
} from "src/store/editStore/editStore";
import useZoomStore from "src/store/zoomStore/zoomStore";
import StretchDots from "./StretchDots";
import { useState } from "react";
import { isTextComponent } from "src/utils";
import TextareaAutosize from "react-textarea-autosize";

export default function EditBox() {
    const zoom = useZoomStore((state) => state.zoom);
    const [cmps, assmbly] = useEditStore((state) => [
        state.canvas.cmps,
        state.assembly,
    ]);
    const selectCmp = cmps[Array.from(assmbly)[0]];
    const [selectCmpFouces, setSelectCmpFouces] = useState(false);

    if (assmbly.size === 0) {
        return null;
    }
    // 设置初始值
    let top = 9999,
        left = 9999,
        right = 0,
        bottom = 0;

    assmbly.forEach((index) => {
        const cmp = cmps[index];
        top = Math.min(top, +cmp.style.top);
        left = Math.min(left, +cmp.style.left);
        bottom = Math.max(bottom, +cmp.style.top + +cmp.style.height);
        right = Math.max(right, +cmp.style.left + +cmp.style.width);
    });
    const width = right - left + 2;
    const height = bottom - top + 2;

    top -= 1;
    left -= 1;

    function onMouseDownOfCmp(e) {
        let startX = e.pageX;
        let startY = e.pageY;

        const move = throttle((e) => {
            const moveingX = e.pageX;
            const moveingY = e.pageY;

            const x = (moveingX - startX) * (100 / zoom);
            const y = (moveingY - startY) * (100 / zoom);
            updateAssemblyCmpsByDistance({ top: y, left: x });
            startX = moveingX;
            startY = moveingY;
        }, 50);

        const up = (e) => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        };
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    }
    return (
        <div
            onMouseDown={onMouseDownOfCmp}
            className="absolute cursor-move box-border border-dashed border border-slate-600"
            style={{
                zIndex: 9999,
                top,
                left,
                width,
                height,
            }}
            onClick={(e) => {
                e.stopPropagation();
            }}
            onDoubleClick={() => setSelectCmpFouces(true)}
        >
            {assmbly.size == 1 &&
                selectCmpFouces &&
                selectCmp.type == isTextComponent && (
                    <TextareaAutosize
                        value={selectCmp.value}
                        style={{
                            ...selectCmp.style,
                            top: 2,
                            left: 2,
                        }}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            updateSelectedCmpAttr("value", newValue);
                        }}
                        onHeightChange={(height) => {
                            updateSelectedCmpStyle({ height });
                        }}
                    />
                )}
            <StretchDots zoom={zoom} style={{ width, height }} />
        </div>
    );
}
