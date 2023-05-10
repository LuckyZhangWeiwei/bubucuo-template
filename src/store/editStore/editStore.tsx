import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand';
import { ICanvas, ICmp, IEditStoreAction, IEditStoreState } from './editStoretyps';
import { getOnlyKey } from 'src/utils';
import Axios from 'src/api/axios';
import { getCanvasByIdEnd, saveCanvasEnd } from 'src/api/api';

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

// 保存画布内容
export const saveCanvas = async(
    id:number| null,
    type:string,
    successCallback:(id:number)=>void
)=>{
    const res:any = await Axios.post(saveCanvasEnd,{
        id,
        type,
        content:JSON.stringify(useEditStore.getState().canvas),
        title:useEditStore.getState().canvas.title
    })
    successCallback(res?.id)
}

//读取画布内容
export const getCanvas = async(id:number)=>{
    const res:any = await Axios.get(getCanvasByIdEnd+id)
    if( res ){
        useEditStore.setState((draft)=>{
            draft.canvas = JSON.parse(res.content)
            draft.canvas.title = res.title
        })
    }
}
//清空画布内容
export const clearCanvas = () => {
    useEditStore.setState((draft)=>{
        draft.canvas = getDefaultCanvas()
    })
}
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