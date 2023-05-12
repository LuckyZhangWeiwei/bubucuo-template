import React from "react";
import useEditStore from "src/store/editStore/editStore";

export default function EditBox() {
    const [cmps, assmbly] = useEditStore((state) => [
        state.canvas.cmps,
        state.assembly,
    ]);

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

    return (
        <div
            className="absolute cursor-move box-border border-dashed border border-slate-600 pointer-events-none"
            style={{
                zIndex: 9999,
                top,
                left,
                width,
                height,
            }}
        ></div>
    );
}
