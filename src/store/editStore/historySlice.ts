import useEditStore from "./editStore";
import type { IEditStore } from "./editStoretyps";

const maxCanvasChangeHistory = 100;

// 记录历史记录 ———— 回退到某步编辑 后面的历史记录删除
// 1 2 *3* 4 5 -——> 1 2 *3* [4]....
export const recordCanvasChangeHistory = (draft: IEditStore) => {
    draft.canvasChangeHistory = draft.canvasChangeHistory.slice(
        0,
        draft.canvasChangeHistoryIndex + 1
    );

    draft.canvasChangeHistory.push({
        canvas: draft.canvas,
        assembly: draft.assembly,
    });
    draft.canvasChangeHistoryIndex++;
    if (draft.canvasChangeHistory.length > maxCanvasChangeHistory) {
        draft.canvasChangeHistory.shift();
        draft.canvasChangeHistoryIndex--;
    }
};

// 上一步
export const goPrevCanvasChangeHistory = () => {
    useEditStore.setState((draft) => {
        let newIndex = draft.canvasChangeHistoryIndex - 1;

        if (newIndex < 0) {
            newIndex = 0;
        }

        if (draft.canvasChangeHistoryIndex === newIndex) {
            return;
        }
        const item = draft.canvasChangeHistory[newIndex];
        draft.canvas = item.canvas;
        draft.assembly = item.assembly;
        draft.canvasChangeHistoryIndex = newIndex;
    });
};

// 下一步
export const goNextCanvasChangeHistory = () => {
    useEditStore.setState((draft) => {
        let newIndex = draft.canvasChangeHistoryIndex + 1;
        if (newIndex >= draft.canvasChangeHistory.length) {
            newIndex = draft.canvasChangeHistory.length - 1;
        } 
        if (draft.canvasChangeHistoryIndex === newIndex) {
            return;
        }
        const item = draft.canvasChangeHistory[newIndex];
        draft.canvas = item.canvas;
        draft.assembly = item.assembly;
        draft.canvasChangeHistoryIndex = newIndex;
    });
};
