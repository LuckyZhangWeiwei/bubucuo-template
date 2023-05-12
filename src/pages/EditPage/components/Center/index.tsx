import Canvas from "./Canvas";
import { selectAllCmps, selectOneCmp } from "src/store/editStore/editStore";
import Zoom from "./Zoom";
import useZoomStore from "src/store/zoomStore/zoomStore";

export default function Center() {
    const [zoom, setZoom] = useZoomStore((state) => [
        state.zoom,
        state.setZoom,
    ]);
    //全选
    const keyDown = (e) => {
        if (e.metaKey) {
            switch (e.code) {
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
            }
        }
    };
    return (
        <div
            id="center"
            className="flex flex-1 justify-center py-12 relative min-h-[1000px]"
            tabIndex={0}
            onClick={(e) => {
                if (e.target?.id === "center") {
                    selectOneCmp(-1);
                }
            }}
            onKeyDown={keyDown}
        >
            <Canvas />
            <Zoom />
        </div>
    );
}
