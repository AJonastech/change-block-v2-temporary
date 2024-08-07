"use client";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { trimSentence } from "@/lib/utils";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import Image from "next/image";
import { AccountSettingsIcon, LogOutIcon } from "@/icons";
import { useRouter } from "next/navigation";
import { BiPlus } from "react-icons/bi";

export default function AccountPopover({ user, isCollapsed }: { user: User | null, isCollapsed: boolean }) {
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
    const router = useRouter();
    
    const handleLogout = async () => {
        setIsLoggingOut(true);
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            setIsLoggingOut(false);
            router.push("/login");
        }
    };

    return (
        <Popover placement="top">
            <PopoverTrigger>
                <div className="w-full p-2 cursor-pointer mx-auto" aria-haspopup="true" aria-expanded="false">
                    <motion.div className="flex gap-x-4 items-center w-full mx-auto">
                        <Image
                            src="/profile.png"
                            alt="Profile"
                            className="h-[52px] w-[52px] rounded-full object-cover mx-auto aspect-square"
                            width={100}
                            height={100}
                        />
                        {!isCollapsed && (
                            <div className="flex flex-1 pr-1 justify-between items-center">
                                <div>
                                    <p className="text-[22px] leading-[28.6px] font-semibold text-grey-800 font-generalSans">
                                        {trimSentence(user?.full_name || "", 15)}
                                    </p>
                                    <p className="text-[15px] font-satoshi font-medium leading-[21px] text-grey-100">
                                        {trimSentence(user?.email || "", 15)}
                                    </p>
                                </div>
                                <IoIosArrowDown width={12} height={12} className="text-grey-500" />
                            </div>
                        )}
                    </motion.div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="ml-[260px] w-fit">
                <ul className="w-[270px]  flex flex-col gap-2 font-medium  rounded-md  p-2">
                    <li className="flex gap-x-3 py-3 px-2 items-center text-lg text-grey-500 hover:bg-gray-100 cursor-pointer rounded-md">
                        <AccountSettingsIcon />
                        <span className="">Account Settings</span>
                    </li>
                    <li className="flex gap-x-3 py-3 px-2 items-center text-lg text-grey-500 hover:bg-gray-100 cursor-pointer rounded-md">
                        <BiPlus width={20} height={20}/>
                        <span className="">Add Account</span>
                    </li>
                    <li className="flex gap-x-3 items-center hover:bg-gray-100 cursor-pointer rounded-md">
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="flex items-center px-2  gap-x-3 w-full text-left py-3 rounded-md bg-[#FECDCD] hover:bg-[#FAB3B3] focus:bg-[#FAB3B3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-[#FA1414] text-lg font-medium"
                            aria-label="Log out"
                        >
                            <LogOutIcon />
                            {isLoggingOut ? "Logging Out..." : "Log Out"}
                        </button>
                    </li>
                </ul>
            </PopoverContent>
        </Popover>
    );
}
