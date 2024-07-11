// components/Sidebar.tsx
"use client";
import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Image, Skeleton, Tooltip } from "@nextui-org/react";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import Link from "next/link";
import SideBarDrawer from "./SideBarDrawer";
import EMPAGeneratorNav from "./EMPAGeneratorNav";
import useIsMounted from "@/hooks/useIsMounted";
import SlideIntoView from "./SlideIntoView";
import { menuItems } from "@/config/panelConfig";
import useGetApp from "@/hooks/useGetApp";
import AutomatedIssuesNav from "./AutomatedIssuesNav";

const Sidebar = () => {
  const { data, section, currentApp, currentPath, pathName } = useGetApp()
  const isMounted = useIsMounted();

  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    data !== null || pathName.includes("/internal-tools/automated-issue-system") ? setIsCollapsed(true) : setIsCollapsed(false);
    data === null && !pathName.includes("/internal-tools/automated-issue-system") && setIsCollapsed(false);
  }, [data, pathName]);


  return (
    <Suspense>
      <div className={` transition-all duration-200 flex gap-1 h-full `}>
        <motion.div
          className={`h-full bg-white shadow-md overflow-x-hidden flex flex-col justify-center items-center   rounded-lg pb-[1.5rem] transition-width duration-300`}
          initial={{ width: isCollapsed ? 80 : 290 }}
          animate={{ width: isCollapsed ? 80 : 290 }}
        >

          <div className="flex flex-col h-full py-5">
            <div
              className={`${isCollapsed ? "flex-col items-center  " : "flex-row items-center"
                }  flex justify-between gap-[1rem]  w-full px-4`}
            >
              <motion.img
                src={isCollapsed ? "/logo-badge.svg" : "/logo.svg"}
                alt="Logo"
                className={` max-h-12 h-full ${!isCollapsed && "w-[184px] h-[44px] object-cover"}  `}
                initial={{ opacity: isCollapsed ? 1 : 1 }}
                animate={{ opacity: isCollapsed ? 1 : 1 }}
              />
              <Button
                // variant="light"
                className="rounded-full h-[44px] w-[44px] text-grey-500 font-bold bg-lemon-50"
                isIconOnly
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <LuArrowRightToLine width={20} height={20} /> : <LuArrowLeftToLine width={20} height={20} />}
              </Button>
            </div>
            <div className="flex-grow gap-2  mt-[80px] ">
              <div

                className={`p-4 text-gray-500 text-sm uppercase ${isCollapsed ? " " : ""
                  }`}
              >
                <span className={` ${isCollapsed ? "hidden mx-1" : "font-satoshi text-[15px] text-grey-100 font-bold"}`}>
                  {" "}
                  Tools
                </span>

                {isCollapsed && (
                  <div className="w-full h-[1px] bg-gray-500"></div>
                )}
              </div>
              {menuItems.map((item, index) =>

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
                        className={`flex items-center text-nowrap font-satoshi text-lg py-3 pl-7 pr-4 cursor-pointer hover:bg-gray-200  ${currentPath?.toLowerCase() ===
                          item?.path?.toLowerCase()
                          ? "bg-secondary mr-4 text-green-500 font-bold   rounded-r-full"
                          : "font-medium text-grey-300"
                          }`}
                      >
                        <span className="text-xl text-nowrap ">
                          <item.icon />
                        </span>
                        {!isCollapsed && (
                          <div className="w-full overflow-hidden">
                            <SlideIntoView index={index} from="left">
                              {" "}
                              <span className="ml-4 ">{item.name}</span>
                            </SlideIntoView>
                          </div>
                        )}
                      </motion.div>
                    </Tooltip>
                  </Link>
                </Skeleton>
              )
              }
            </div>
            <div className="p-4 w-full  mx-auto">
              <motion.div className="flex gap-x-4 items-center w-full  mx-auto">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  className="h-[52px] w-[52px] rounded-full object-cover  mx-auto aspect-square"
                  width={100}
                  height={100}
                />
                {!isCollapsed && (
                  <div className="">
                    <p className="text-[22px] leading-[28.6px] font-semibold text-grey-800 font-generalSans">Mary Jane</p>
                    <p className="text-[15px] font-satoshi font-medium leading-[21px] text-grey-100">m.jane@changeblock.co</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={` transition-width`}
          initial={{ width: data === "report" && isMounted || pathName.includes("/internal-tools/automated-issue-system") ? 288 : 0 }}
          animate={{ width: data === "report" && isMounted || pathName.includes("/internal-tools/automated-issue-system") ? 288 : 0 }}
        >
          <SideBarDrawer>
            {currentApp === "EMPA generator" && data === "report" && (
              <EMPAGeneratorNav data={data} section={section} />
            )}
            {pathName.includes("/internal-tools/automated-issue-system") && (
              <AutomatedIssuesNav />
            )}
          </SideBarDrawer>
        </motion.div>
      </div>
    </Suspense>

  );
};

export default Sidebar;
