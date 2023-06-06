import Canvas from "./Canvas";
import {
    delSelectedCmps,
    downZIndex,
    selectAllCmps,
    selectOneCmp,
    upZIndex,
} from "src/store/editStore/editStore";
import Zoom from "./Zoom";
import useZoomStore from "src/store/zoomStore/zoomStore";
import {
    goNextCanvasChangeHistory,
    goPrevCanvasChangeHistory,
} from "src/store/editStore/historySlice";

export default function Center() {
    const [zoom, setZoom] = useZoomStore((state) => [
        state.zoom,
        state.setZoom,
    ]);
    //全选
    const keyDown = (e) => {
        if ((e.target as HTMLElement).nodeName === "TEXTAREA") return;

        switch (e.code) {
            case "Backspace":
                delSelectedCmps();
                return;
        }
        if (e.metaKey) {
            switch (e.code) {
                case "ArrowUp":
                    e.preventDefault();
                    upZIndex();
                    return;
                case "ArrowDown":
                    e.preventDefault();
                    downZIndex();
                    return;
                case "KeyA":
                    selectAllCmps();
                    return;
                case "Equal":
                    setZoom(zoom + 10);
                    e.preventDefault();
                    return;
                case "Minus":
                    setZoom(zoom - 10);
                    e.preventDefault();
                    return;
                case "KeyZ":
                    if (e.shiftKey) {
                        goNextCanvasChangeHistory();
                    } else {
                        goPrevCanvasChangeHistory();
                    }
                    return;
            }
        }
    };
    return (
        <div
            id="center"
            className="flex flex-1 justify-center py-12 relative min-h-[1000px]"
            tabIndex={0}
            onClick={(e) => {
                if ((e.target as HTMLElement).id.indexOf("cmp") === -1) {
                    selectOneCmp(-1);
                }
            }}
            onKeyDown={keyDown}
            onContextMenu={(e) => e.preventDefault()}
        >
            <Canvas />
            <Zoom />
        </div>
    );
}
