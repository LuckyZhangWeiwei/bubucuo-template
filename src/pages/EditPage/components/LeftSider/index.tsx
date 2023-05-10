import React, { useState } from "react";
import TextSide from "./components/TextSide";
import OptionComponent from "./components/OptionComponent";
import ImgSide from "./components/ImgSide";
import GraphSide from "./components/GraphSide";
import { isGraphComponent, isImgComponent, isTextComponent } from "src/utils";

export default function LeftSide() {
    const [showSide, setShowSide] = useState(0);

    const _setShowSide = (which: number) => {
        if (showSide === which) {
            setShowSide(0);
        } else {
            setShowSide(which || 0);
        }
    };
    return (
        <div className="fixed flex h-full shadow-md bg-white z-1">
            <ul className="w-20">
                <OptionComponent
                    showSide={showSide}
                    _setShowSide={_setShowSide}
                    title="文本"
                    icon="icon-wenben"
                    optionComponentType={isTextComponent}
                />

                <OptionComponent
                    showSide={showSide}
                    _setShowSide={_setShowSide}
                    title="图片"
                    icon="icon-xiangpian"
                    optionComponentType={isImgComponent}
                />

                <OptionComponent
                    showSide={showSide}
                    _setShowSide={_setShowSide}
                    title="图形"
                    icon="icon-biaoji"
                    optionComponentType={isGraphComponent}
                />
            </ul>
            {showSide === isTextComponent && <TextSide />}
            {showSide === isImgComponent && <ImgSide />}
            {showSide === isGraphComponent && <GraphSide />}
        </div>
    );
}
