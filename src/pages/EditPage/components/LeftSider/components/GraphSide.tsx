import { defaultComponentStyle } from "src/utils/const";
import { addCmp } from "src/store/editStore/editStore";
import { isGraphComponent } from "src/utils";

const defaultStyle = {
    ...defaultComponentStyle,
    width: 120,
    height: 120,
    borderColor: "blue",
    backgroundColor: "blue",
};

const settings = [
    {
        key: "graph0",
        value: "",
        style: {
            ...defaultStyle,
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: "transparent",
        },
    },
    {
        key: "graph1",
        value: "",
        style: defaultStyle,
    },
];

export default function TextSide() {
    console.log("TextSide render");

    const onDragStart = (e: React.DragEvent<HTMLLIElement>, item) => {
        e.dataTransfer.setData("drag-cmp", JSON.stringify(item));
        console.log(item);
    };
    return (
        <div className="top-0 left-20 h-full px-4 pt-3 pb-16 overflow-scroll shadow-sm bg-white">
            <ul className="w-64 flex justify-between flex-wrap gap-3">
                {settings.map((item) => (
                    <li
                        draggable={true}
                        onDragStart={(e) =>
                            onDragStart(e, { ...item, type: isGraphComponent })
                        }
                        key={item.value}
                        className="flex justify-center items-center rounded-md w-28 h-28 overflow-hidden border-slate-100 border border-solid text-center
                        hover:font-bold hover:text-blue-300 hover:border-blue-300"
                        onClick={() =>
                            addCmp({ ...item, type: isGraphComponent })
                        }
                        style={{
                            width: item.style.width,
                            height: item.style.height,
                            backgroundColor: item.style.backgroundColor,
                            borderStyle: item.style.borderStyle,
                            borderColor: item.style.borderColor,
                        }}
                    ></li>
                ))}
            </ul>
        </div>
    );
}
