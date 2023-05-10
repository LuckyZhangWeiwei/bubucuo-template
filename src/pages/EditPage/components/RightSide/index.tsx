import { FormOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";

export default function RightSide() {
    const [showEdit, setShowEdit] = useState(false);

    return (
        <div className="relative">
            <div className="fixed top-24 right-0 w-20 h-10 text-sm text-slate-400 cursor-pointer">
                <Button
                    onClick={() => setShowEdit(!showEdit)}
                    type="primary"
                    icon={<FormOutlined />}
                ></Button>
            </div>
        </div>
    );
}
