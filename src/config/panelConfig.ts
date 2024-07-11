import { EMPAIcon, ToolsIcon, HomeIcon, ChannelIcon, ChatIcon } from "@/icons";
import { IconType } from "react-icons";


interface  item{
    name:string,
    icon:   () => JSX.Element
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


  export const automatedIssuesItems:item[] = [
    {
        name: "Home",
        icon:HomeIcon,
        path:"/internal-tools/automated-issue-system"
    },
    {
        name: "Set Channel",
        icon:ChannelIcon,
        path:"/internal-tools/automated-issue-system/set-channel"
    },
    {
        name: "Set Chat",
        icon:ChatIcon,
        path:"/internal-tools/automated-issue-system/set-chat"
    }
  ]
  