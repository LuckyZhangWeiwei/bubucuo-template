import { isString } from "antd/es/button";
import { useSearchParams } from "react-router-dom";

export function useCanvasId():number | null{
    const [ params ] = useSearchParams()
    let id:any = params.get('id')

    if( isString(id) ){
        id = parseInt(id)
    }
    return id
}

export function useCanvasType(){
    const [ params ] = useSearchParams()
    const type = params.get('type')

    
    return type || "content"
}