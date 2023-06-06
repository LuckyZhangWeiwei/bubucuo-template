import {
    addAssemblyCmps,
    bottomZIndex,
    delSelectedCmps,
    downZIndex,
    topZIndex,
    upZIndex,
} from "src/store/editStore/editStore";

export default function Menu({
    style,
    assemblySize,
}: {
    style: any;
    assemblySize: number;
}) {
    if (assemblySize === 0) {
        return null;
    }

    return (
        <div className="absolute top-0" style={style}>
            <ul className="flex flex-col align-top shadow-sm bg-white/90 rounded-md text-center text-sm text-slate-600">
                <li
                    onClick={addAssemblyCmps}
                    className="w-[80px] h-[32px] cursor-pointer hover:bg-blue-100/30 leading-8"
                >
                    复制组件
                </li>
                <li
                    className="w-[80px] h-[32px] cursor-pointer hover:bg-blue-100/30 leading-8"
                    onClick={delSelectedCmps}
                >
                    删除组件
                </li>
                {assemblySize === 1 && (
                    <>
                        <li
                            onClick={upZIndex}
                            className="w-[80px] h-[32px] cursor-pointer hover:bg-blue-100/30 leading-8"
                        >
                            上移一层
                        </li>
                        <li
                            onClick={downZIndex}
                            className="w-[80px] h-[32px] cursor-pointer hover:bg-blue-100/30 leading-8"
                        >
                            下移一层
                        </li>
                        <li
                            onClick={topZIndex}
                            className="w-[80px] h-[32px] cursor-pointer hover:bg-blue-100/30 leading-8"
                        >
                            置顶
                        </li>
                        <li
                            onClick={bottomZIndex}
                            className="w-[80px] h-[32px] cursor-pointer hover:bg-blue-100/30 leading-8"
                        >
                            置底
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}
