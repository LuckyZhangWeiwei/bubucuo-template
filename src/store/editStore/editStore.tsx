import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand';
import { ICanvas, ICmp, IEditStoreAction, IEditStoreState } from './editStoretyps';
import { getOnlyKey } from 'src/utils';

const useEditStore = create(
    immer<IEditStoreState & IEditStoreAction>((set) => ({
        canvas: getDefaultCanvas(),
        addCmp: (_cmp: ICmp) => {
            set((state) => {
                state.canvas.cmps.push({ ..._cmp, key: getOnlyKey() });
            })
        }
    }))
)
export default useEditStore;

function getDefaultCanvas(): ICanvas {
    return {
        title: "未命名",
        // 页面样式
        style: {
            width: 320,
            height: 568,
            backgroundColor: "#ffffff",
            backgroundImage: "",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        },
        // 组件
        cmps: [],
    };
}