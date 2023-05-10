import {defaultComponentStyle} from "src/utils/const";
import useEditStore from "src/store/editStore/editStore";
import { isTextComponent } from "src/utils";

const defaultStyle = {
  ...defaultComponentStyle,
  width: 170,
  height: 30,
  lineHeight: "30px",
  fontSize: 12,
  fontWeight: "normal",
  textDecoration: "none",
  color: "#000",
  backgroundColor: "#ffffff00",
  textAlign: "left",
  wordSpacing: "10px",
};

const settings = [
  {
    value: "双击编辑标题",
    style: {
      ...defaultStyle,
      fontSize: 28,
      height: 50,
      lineHeight: "50px",
    },
  },
  {
    value: "双击编辑正文",
    style: defaultStyle,
  },
];

export default function TextSide() {
  const addCmp  = useEditStore((state)=>state.addCmp);
  console.log("TextSide render");

  const onDragStart = (e:React.DragEvent<HTMLLIElement>,item)=>{
    e.dataTransfer.setData("drag-cmp",JSON.stringify(item));
    console.log(item);
  }
  return (
    <div className="top-0 left-20 h-full px-4 pt-3 pb-16 overflow-scroll shadow-sm bg-white">
      <ul className="w-64 flex justify-between flex-wrap gap-3">
        {settings.map((item) => (
          <li 
            draggable={true}
            onDragStart={(e)=>onDragStart(e,{...item,type:isTextComponent})}
            key={item.value} 
            className="flex justify-center items-center rounded-md w-28 h-28 overflow-hidden border-slate-100 border border-solid text-center
            hover:font-bold hover:text-blue-300 hover:border-blue-300" 
            onClick={()=>addCmp({...item,type:isTextComponent})}>
            {item.value.indexOf("双击编辑") > -1
              ? item.value.slice(4)
              : item.value}
          </li>
          
        ))}
      </ul>
    </div>
  );
}
