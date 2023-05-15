import { FormOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import useEditStore from "src/store/editStore/editStore";
import EditCanvas from "./EditCanvas";
import EditCmp from "./EditCmp";
import EditCmps from "./EditCmps";

// 画布编辑 / 单一组件编辑 /多个组件编辑
export default function RightSide() {
    const [canvas, assembly] = useEditStore((state) => [
        state.canvas,
        state.assembly,
    ]);
    const [showEdit, setShowEdit] = useState(false);

    const assemblySize = assembly.size;
    return (
        <div className="relative">
            <div className="fixed top-24 right-[400px] w-20 h-10 text-sm text-slate-400 cursor-pointer">
                <Button
                    onClick={() => setShowEdit(!showEdit)}
                    type="primary"
                    icon={<FormOutlined />}
                ></Button>
            </div>
            {showEdit &&
                (assemblySize == 0 ? (
                    <EditCanvas canvas={canvas} />
                ) : assemblySize == 1 ? (
                    <EditCmp
                        selectedCmp={canvas.cmps[Array.from(assembly)[0]]}
                    />
                ) : (
                    <EditCmps />
                ))}
        </div>
    );
}
