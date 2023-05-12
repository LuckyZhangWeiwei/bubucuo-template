import { Slider } from "antd";
import useZoomStore from "src/store/zoomStore/zoomStore";

export default function Zoom() {
    const [zoom, setZoom] = useZoomStore((state) => [
        state.zoom,
        state.setZoom,
    ]);

    return (
        <div className="w-28 fixed right-[180px] bottom-5">
            <Slider
                min={50}
                max={150}
                value={zoom}
                onChange={(e) => setZoom(e)}
                step={10}
            />
        </div>
    );
}
