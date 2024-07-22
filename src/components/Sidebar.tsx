"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button, Image, Tooltip } from "@nextui-org/react";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import Link from "next/link";
import dynamic from 'next/dynamic';
import useIsMounted from "@/hooks/useIsMounted";
import { menuItems } from "@/config/panelConfig";
import useGetApp from "@/hooks/useGetApp";

const SideBarDrawer = dynamic(() => import('./SideBarDrawer'));
const EMPAGeneratorNav = dynamic(() => import('./EMPAGeneratorNav'));
const AutomatedIssuesNav = dynamic(() => import('./AutomatedIssuesNav'));

const Sidebar = () => {
  const { data, section, currentApp, currentPath, pathName } = useGetApp();
  const isMounted = useIsMounted();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (data !== null || pathName.includes("/internal-tools/automated-issue-system")) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [data, pathName]);

  const handleToggleCollapse = () => setIsCollapsed(prev => !prev);

  const sidebarWidth = useMemo(() => (isCollapsed ? 80 : 290), [isCollapsed]);
  const drawerWidth = useMemo(() => (data === "report" && isMounted || pathName.includes("/internal-tools/automated-issue-system") ? 306 : 0), [data, isMounted, pathName]);




  return (
    <div className="transition-all duration-200 flex gap-1 h-full">
      <motion.div
        className="h-full bg-white shadow-md overflow-x-hidden flex flex-col justify-center items-center rounded-lg pb-[1.5rem] transition-width duration-300"
        initial={{ width: sidebarWidth }}
        animate={{ width: sidebarWidth }}
      >
        <div className="flex flex-col h-full py-5">
          <div className={`flex ${isCollapsed ? "flex-col items-center" : "flex-row items-center"} justify-between gap-[1rem] w-full px-4`}>
            <motion.img
              src={isCollapsed ? "/logo-badge.svg" : "/logo.svg"}
              alt="Logo"
              className={`max-h-12 h-full ${!isCollapsed && "w-[184px] h-[44px] object-cover"}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            />
            <Button
              className="rounded-full h-[44px] w-[44px] text-grey-500 font-bold bg-lemon-50"
              isIconOnly
              onClick={handleToggleCollapse}
            >
              {isCollapsed ? <LuArrowRightToLine width={20} height={20} /> : <LuArrowLeftToLine width={20} height={20} />}
            </Button>
          </div>
          <div className="flex-grow gap-2 mt-[80px]">
            <div className={`p-4 text-gray-500 text-sm uppercase ${isCollapsed ? "" : ""}`}>
              <span className={`${isCollapsed ? "hidden mx-1" : "font-satoshi text-[15px] text-grey-100 font-bold"}`}>
                Tools
              </span>
              {isCollapsed && (
                <div className="w-full h-[1px] bg-gray-500"></div>
              )}
            </div>
            <div className="flex flex-col gap-2">

   
            {menuItems.map((item, index) => (
              <Link  key={index} href={`/${item.path}`}>
                <Tooltip
                  content={item.name}
                  placement="right"
                  isDisabled={!isCollapsed}
                  className=""
                >
                  <motion.div
                    className={`flex items-center text-nowrap font-satoshi rounded-r-full text-lg py-3 pl-7 pr-4 cursor-pointer hover:bg-gray-200 mr-4 ${currentPath?.toLowerCase() === item?.path?.toLowerCase() ? "bg-secondary  text-green-500 font-bold " : "font-medium text-grey-300"}`}
                  >
                    <span className="text-xl text-nowrap">
                      <item.icon />
                    </span>
                    {!isCollapsed && (
                      <div className="w-full overflow-hidden">
                        <span className="ml-4">{item.name}</span>
                      </div>
                    )}
                  </motion.div>
                </Tooltip>
              </Link>
            ))}
                     </div>
          </div>
          <div className="p-4 w-full mx-auto">
            <motion.div className="flex gap-x-4 items-center w-full mx-auto">
              <Image
                src="/profile.png"
                alt="Profile"
                className="h-[52px] w-[52px] rounded-full object-cover mx-auto aspect-square"
                width={100}
                height={100}
              />
              {!isCollapsed && (
                <div>
                  <p className="text-[22px] leading-[28.6px] font-semibold text-grey-800 font-generalSans">Mary Jane</p>
                  <p className="text-[15px] font-satoshi font-medium leading-[21px] text-grey-100">m.jane@changeblock.co</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="transition-width"
        initial={{ width: drawerWidth }}
        animate={{ width: drawerWidth }}
      >
        <SideBarDrawer>
          {currentApp === "EMPA" && data === "report" && (
            <EMPAGeneratorNav data={data} section={section} />
          )}
          {pathName.includes("/internal-tools/automated-issue-system") && (
            <AutomatedIssuesNav />
          )}
        </SideBarDrawer>
      </motion.div>
    </div>
  );
};

export default React.memo(Sidebar);
