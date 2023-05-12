import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface zoomStoreType {
    zoom: number;
    setZoom: (_zoom: number) => void;
}

const useZoomStore = create(
    immer<zoomStoreType>((set) => ({
        zoom: 100,
        setZoom: (_zoom) =>
            set((draft) => {
                if (_zoom <= 150 && _zoom >= 50) {
                    draft.zoom = _zoom;
                }
            }),
    }))
);

export const removeZoom = () => {
    useZoomStore.setState({ zoom: 100 });
};
export default useZoomStore;
