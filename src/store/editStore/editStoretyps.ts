import React from "react";

export interface ICanvas {
    title: string;
    style: React.CSSProperties;
    cmps:Array<ICmpWithKey>
}

export interface ICmp {
    type: number;
    style: React.CSSProperties;
    value:string;
    onClick?:string;
}
export interface ICmpWithKey extends ICmp {
    key: number;
}

// * 定义仓库state和action
export type IEditStoreState = {
    canvas: ICanvas;
}

export type IEditStoreAction = {
    addCmp: (_cmp: ICmp) => void;
}

export interface IEditStore extends IEditStoreState, IEditStoreAction { }