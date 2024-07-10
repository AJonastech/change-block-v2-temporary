import { EMPAIcon, ToolsIcon } from "@/icons";
import { IconType } from "react-icons";


interface  item{
    name:string,
    icon:IconType,
    path:string

}
export const menuItems:item[] = [
 //   { name: "Tools", isHeader: true },
    {
      name: "EMPA Generator",
      icon: EMPAIcon,
      path: "",
    },
    {
      name: "Internal Tools",
      icon: ToolsIcon,
      path: "internal-tools",
    },
    
  ];
  