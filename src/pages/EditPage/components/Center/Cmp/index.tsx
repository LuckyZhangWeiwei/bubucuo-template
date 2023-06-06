import React, { memo } from "react";
import { ICmpWithKey } from "src/store/editStore/editStoretyps";
import { isImgComponent, isTextComponent } from "src/utils";
import { ImgCmp, TextCmp } from "./CmpDetail";
import { omit, pick } from "lodash";
import clsx from "clsx";
import { selectOneCmp, selectSomeCmps } from "src/store/editStore/editStore";
interface ICmpPorps {
    cmp: ICmpWithKey;
    zIndex: number;
    isSelected: boolean;
}

const Cmp = memo((props: ICmpPorps) => {
    const { cmp, zIndex, isSelected } = props;

    const selectCmp = (e) => {
        e.stopPropagation();
        if (e.metaKey) {
            selectSomeCmps([zIndex]);
        } else {
            selectOneCmp(zIndex);
        }
    };
    // 外层div做定位
    const outStyle = pick(cmp.style, [
        "position",
        "top",
        "left",
        "width",
        "height",
    ]);
    // 内层div做其他样式
    const innerStyle = omit(cmp.style, "position", "top", "left");
    const transform = `rotate(${cmp.style.transform}deg)`;

    const selectedClass = clsx(
        "",
        isSelected && "border border-dashed border-slate-500 box-content"
    );
    console.log("cmp render");
    return (
        <div
            className={selectedClass}
            style={{
                ...outStyle,
                transform,
                zIndex: zIndex,
            }}
            onClick={selectCmp}
        >
            <div
                className=" overflow-hidden whitespace-pre-wrap"
                style={{ ...innerStyle }}
            >
                {cmp.type === isTextComponent && <TextCmp value={cmp.value} />}
                {cmp.type === isImgComponent && <ImgCmp value={cmp.value} />}
            </div>
        </div>
    );
});
export default Cmp;
