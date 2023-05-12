import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCanvasId, useCanvasType } from "src/utils/hooks";
import { saveCanvas, clearCanvas } from "src/store/editStore/editStore";
import { message } from "antd";

export default function Header() {
    const id = useCanvasId();
    const type = useCanvasType();
    const navigate = useNavigate();

    const save = () => {
        message.success("保存成功");
        saveCanvas(id, type, (_id) => {
            if (id === null) {
                // 新增
                navigate(`?id=${_id}`);
            }
        });
    };
    const saveAndPreview = () => {
        saveCanvas(id, type, (_id) => {
            message.success("保存成功");
            if (id === null) {
                navigate(`?id=${_id}`);
            }
            // 跳转生成器项目页
            window.open(
                "http://builder.codebus.tech?id=" + (id === null ? _id : id)
            );
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex justify-between w-full h-16 px-2 mt--16 
        text-center text-slate-600 box-border bg-white"
        >
            <div className="relative flex items-center cursor-default text-center">
                <Link to="/list" className="edit-header-item">
                    <div className="iconfont icon-liebiao text-base"></div>
                    <span className="text-xs select-none">查看列表</span>
                </Link>
            </div>

            <div className="edit-header-item" onClick={save}>
                <span className="iconfont icon-baocun text-base"></span>
                <span className="text-xs select-none">保存</span>
            </div>

            <div className="edit-header-item" onClick={saveAndPreview}>
                <span className="iconfont icon-yulanzupu text-xl"></span>
                <span className="text-xs select-none">保存并预览</span>
            </div>

            <div className="edit-header-item">
                <span className="iconfont icon-zuojiantou"></span>
                <span className="text-xs select-none">上一步（CMD+Z）</span>
            </div>

            <div className="edit-header-item">
                <span className="iconfont icon-youjiantou"></span>
                <span className="text-xs select-none">撤销（CMD+Shift+Z）</span>
            </div>

            <div className="edit-header-item" onClick={clearCanvas}>
                <span className="iconfont icon-shanchu"></span>
                <span className="text-xs select-none">清空</span>
            </div>
        </div>
    );
}
