// components/Sidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Image, Skeleton, Tooltip } from "@nextui-org/react";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import { BoxTick, Briefcase } from "iconsax-react";
import Link from "next/link";
import SideBarDrawer from "./SideBarDrawer";
import EMPAGeneratorNav from "./EMPAGeneratorNav";

import { useSearchParam } from "react-use";
import useIsMounted from "@/lib/hooks/useIsMounted";
import SlideIntoView from "./SlideIntoView";
import { usePathname } from "next/navigation";
import { EMPAIcon, ToolsIcon } from "@/icons";

const menuItems = [
  { name: "Tools", isHeader: true },
  {
    name: "Internal Tools",
    icon: <ToolsIcon />,
    path: "",
  },
  {
    name: "EMPA Generator",
    icon: <EMPAIcon />,
    path: "EMPA-generator",
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  const data = useSearchParam("data");
  const section = useSearchParam("section");

  const currentPath = pathName?.split("/")[1];

  const currentApp = currentPath?.split("-").join(" ");
  const isMounted = useIsMounted();

  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    data !== null ? setIsCollapsed(true) : setIsCollapsed(false);
    data === null && setIsCollapsed(false);
  }, [data]);

  console.log({ data, isCollapsed });

  return (
    <div className={` transition-all duration-200 flex gap-1 h-full `}>
      <motion.div
        className={`h-full bg-white shadow-md overflow-x-hidden   rounded-lg pb-[1.5rem] transition-width duration-300`}
        initial={{ width: isCollapsed ? 80 : 290 }}
        animate={{ width: isCollapsed ? 80 : 290 }}
      >
        <div className="flex flex-col h-full">
          <div
            className={`${
              isCollapsed ? "flex-col items-center  " : "flex-row items-center"
            }  flex justify-between gap-[1rem]  w-full px-4`}
          >
            <motion.img
              src={isCollapsed ? "/logo-badge.svg" : "/logo.svg"}
              alt="Logo"
              className={` max-h-12 h-full w-fit  `}
              initial={{ opacity: isCollapsed ? 1 : 1 }}
              animate={{ opacity: isCollapsed ? 1 : 1 }}
            />
            <Button
              // variant="light"
              className="rounded-full min-h-[3rem] min-w-[3rem] text-2xl bg-gray-300/20"
              isIconOnly
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <LuArrowRightToLine /> : <LuArrowLeftToLine />}
            </Button>
          </div>
          <div className="flex-grow gap-2  ">
            {menuItems.map((item, index) =>
              item.isHeader ? (
                <div
                  key={item.name}
                  className={`p-4 text-gray-500 text-sm uppercase ${
                    isCollapsed ? " " : ""
                  }`}
                >
                  <span className={` ${isCollapsed ? "hidden mx-1" : ""}`}>
                    {" "}
                    {item.name}
                  </span>

                  {isCollapsed && (
                    <div className="w-full h-[1px] bg-gray-500"></div>
                  )}
                </div>
              ) : (
                <Skeleton
                  key={item.name}
                  isLoaded={isMounted}
                  className="my-2 not-prose"
                >
                  <Link href={`/${item.path}`}>
                    <Tooltip
                      content={item.name}
                      placement="right"
                      isDisabled={!isCollapsed}
                      className=" "
                    >
                      <motion.div
                        className={`flex items-center text-nowrap py-3 pl-7 pr-4 cursor-pointer hover:bg-gray-200  ${
                          currentPath?.toLowerCase() ===
                          item?.path?.toLowerCase()
                            ? "bg-secondary mr-4  rounded-r-full"
                            : ""
                        }`}
                      >
                        <span className="text-xl text-nowrap ">
                          {item.icon}
                        </span>
                        {!isCollapsed && (
                          <div className="w-full overflow-hidden">
                            <SlideIntoView index={index} from="left">
                              {" "}
                              <span className="ml-4">{item.name}</span>
                            </SlideIntoView>
                          </div>
                        )}
                      </motion.div>
                    </Tooltip>
                  </Link>
                </Skeleton>
              )
            )}
          </div>
          <div className="p-4 w-full  mx-auto">
            <motion.div className="flex gap-x-4 items-center w-full  mx-auto">
              <Image
                src="/profile.png"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover bg-gray-400 mx-auto aspect-square"
                width={100}
                height={100}
              />
              {!isCollapsed && (
                <div className="">
                  <p className="-mb-4">Mary Jane</p>
                  <p className="text-xs text-gray-600">m.jane@changeblock.co</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={` transition-width`}
        initial={{ width: data === "report" && isMounted ? 288 : 0 }}
        animate={{ width: data === "report" && isMounted ? 288 : 0 }}
      >
        <SideBarDrawer>
          {currentApp === "EMPA generator" && data === "report" && (
            <EMPAGeneratorNav data={data} section={section} />
          )}
        </SideBarDrawer>
      </motion.div>
    </div>
  );
};

export default Sidebar;
