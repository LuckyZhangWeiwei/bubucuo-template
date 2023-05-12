import React from "react";
import Canvas from "./Canvas";
import { selectAllCmps, selectOneCmp } from "src/store/editStore/editStore";

export default function Center() {
    //全选
    const keyDown = (e) => {
        if (e.metaKey) {
            switch (e.code) {
                case "KeyA":
                    selectAllCmps();
                    return;
            }
        }
    };
    return (
        <div
            id="center"
            className="flex flex-1 justify-center py-12 relative"
            tabIndex={0}
            onClick={(e) => {
                if (e.target?.id === "center") {
                    selectOneCmp(-1);
                }
            }}
            onKeyDown={keyDown}
        >
            <Canvas />
        </div>
    );
}
