import { useState } from "react";
import { ColorPickerPanel } from "@rc-component/color-picker";

export default function InputColor({ onChangeComplete, color, ...rest }: any) {
    const [visible, setVisible] = useState(false);

    return (
        <div
            style={{
                position: "relative",
                backgroundColor: color,
            }}
            {...rest}
            onClick={(e) => {
                if (!visible) {
                    setVisible(true);
                }
            }}
            onMouseLeave={() => {
                setVisible(false);
            }}
        >
            {visible && (
                <div className="relative z-10 mt-10 ml--22 p-4 w-[340px] bg-white">
                    <span
                        className="absolute top-0 left-1 text-slate-400 cursor-pointer"
                        onClick={(e) => {
                            setVisible(false);
                        }}
                    >
                        X
                    </span>
                    <div style={{ width: 210 }}>
                        <ColorPickerPanel
                            color={color}
                            onChange={onChangeComplete}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
