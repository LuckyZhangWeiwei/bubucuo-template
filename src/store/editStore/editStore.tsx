import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { ICanvas, ICmp, IEditStoreState } from "./editStoretyps";
import { getOnlyKey } from "src/utils";
import Axios from "src/api/axios";
import { getCanvasByIdEnd, saveCanvasEnd } from "src/api/api";
import { removeZoom } from "../zoomStore/zoomStore";

const useEditStore = create(
    immer<IEditStoreState>(() => ({
        canvas: getDefaultCanvas(),
        assembly: new Set(),
    }))
);
// 修改单个组件的style
export const updateSelectedCmpStyle = (newStyle: any) => {
    useEditStore.setState((draft) => {
        const cmp = draft.canvas.cmps[Array.from(draft.assembly)[0]];
        Object.assign(cmp.style, newStyle);
    });
};
// 修改单个组件的属性
export const updateSelectedCmpAttr = (name: string, value: string) => {
    useEditStore.setState((draft) => {
        const selecetedCmpIndex = Array.from(draft.assembly)[0];
        const cmp = draft.canvas.cmps[selecetedCmpIndex];
        cmp[name] = value;
    });
};
// 修改选中组件style
export const editAssemblyStyle = (newStyle: any) => {
    useEditStore.setState((draft) => {
        const canvasStyle = draft.canvas.style;
        draft.assembly.forEach((index) => {
            const cmpStyle = draft.canvas.cmps[index].style;
            if (newStyle.right === 0) {
                cmpStyle.left = canvasStyle.width - cmpStyle.width;
            } else if (newStyle.bottom === 0) {
                cmpStyle.top = canvasStyle.height - cmpStyle.height;
            } else if (newStyle.left === "center") {
                cmpStyle.left = (canvasStyle.width - cmpStyle.width) / 2;
            } else if (newStyle.top === "center") {
                cmpStyle.top = (canvasStyle.height - cmpStyle.height) / 2;
            } else {
                Object.assign(cmpStyle, newStyle);
            }
            draft.canvas.cmps[index].style = cmpStyle;
        });
    });
};
// 修改画布title
export const updateCanvasTitle = (_title: string) => {
    useEditStore.setState((draft) => {
        draft.canvas.title = _title;
    });
};
// 修改画布style
export const updateCanvasStyle = (_style: any) => {
    useEditStore.setState((draft) => {
        draft.canvas.style = { ...draft.canvas.style, ..._style };
    });
};
// 增加画布组件
export const addCmp = (cmp: ICmp) => {
    useEditStore.setState((draft) => {
        draft.canvas.cmps.push({ ...cmp, key: getOnlyKey() });
        draft.assembly = new Set([draft.canvas.cmps.length - 1]);
    });
};
// 保存画布内容
export const saveCanvas = async (
    id: number | null,
    type: string,
    successCallback: (id: number) => void
) => {
    const res: any = await Axios.post(saveCanvasEnd, {
        id,
        type,
        content: JSON.stringify(useEditStore.getState().canvas),
        title: useEditStore.getState().canvas.title,
    });
    successCallback(res?.id);
};

//读取画布内容
export const getCanvas = async (id: number) => {
    const res: any = await Axios.get(getCanvasByIdEnd + id);
    if (res) {
        useEditStore.setState((draft) => {
            draft.canvas = JSON.parse(res.content);
            draft.canvas.title = res.title;
        });
        removeZoom();
    }
};
//清空画布内容
export const clearCanvas = () => {
    useEditStore.setState((draft) => {
        draft.canvas = getDefaultCanvas();
        draft.assembly.clear();
    });
    removeZoom();
};

// 全选组件
export const selectAllCmps = () => {
    useEditStore.setState((draft) => {
        draft.assembly = new Set(
            Array.from({ length: draft.canvas.cmps.length }, (a, b) => b)
        );
    });
};
// 多选组件
export const selectSomeCmps = (indexArr: number[]) => {
    useEditStore.setState((draft) => {
        if (indexArr)
            indexArr.forEach((index) => {
                if (draft.assembly.has(index)) {
                    draft.assembly.delete(index);
                } else {
                    draft.assembly.add(index);
                }
            });
    });
};
// 选中一个组件
export const selectOneCmp = (index: number) => {
    useEditStore.setState((draft) => {
        if (index === -1) {
            draft.assembly.clear();
        } else {
            draft.assembly = new Set([index]);
        }
    });
};
// 修改组件属性（位置/伸缩）
export const updateAssemblyCmpsByDistance = (newStyle: any) => {
    useEditStore.setState((draft) => {
        draft.assembly.forEach((index) => {
            const cmp = { ...draft.canvas.cmps[index] };
            let invaild = false;
            for (const key in newStyle) {
                if (
                    (key === "width" || key === "height") &&
                    cmp.style[key] + newStyle[key] < 2
                ) {
                    invaild = true;
                    break;
                }
                cmp.style[key] += newStyle[key];
            }
            if (!invaild) draft.canvas.cmps[index] = cmp;
        });
    });
};
export default useEditStore;

export function getDefaultCanvas(): ICanvas {
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
