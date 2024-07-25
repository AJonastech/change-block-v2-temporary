import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
function AddClient() {
    const clients = ["New Age", "Blue Oceans", "Bitter Leaf", "New Age"];
    return (
        <Popover className="w-full" placement="top">
            <PopoverTrigger>
                <div className="border-[1px] px-4 py-2 border-[#C1C2C0]/50 rounded-2xl">
                    <p className=" text-[15px] text-grey-300 font-satoshi leading-[21px]">Client</p>
                    <p className="font-satoshi text-[15px] text-grey-700 font-semibold">GreenLife</p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-full border-0 p-0 shadow-none ">
                <ul className="w-full border-[1px] py-1 bg-grey-10  min-w-[255px] rounded-xl overflow-hidden">
                    {clients.map((client, index) => (
                        <li
                            key={index}
                            className="flex justify-between border-[#C1C2C0]/50  border-0 items-center p-5 border-b-[1px]  last:border-b-0 cursor-pointer hover:bg-white"
                        >
                            <span className="font-satoshi text-[15px] leading-[21px] text-grey-300">{client}</span>
                            <FaArrowRight strokeWidth={0.2} className=" h-4 w-4 font-satoshi text-grey-100" />
                        </li>
                    ))}
                    <Link href={"/EMPA/generate"} target="blank">
                    <li className="flex justify-between items-center p-5 cursor-pointer hover:bg-white">
                        <span className="font-semibold font-satoshi text-[15px] text-grey-700">Add New Client</span>
                        <BiPlus className="h-6 font-satoshi text-[15px] text-grey-700 w-6 " />
                    </li>
                    </Link>
                  
                </ul>
            </PopoverContent>
        </Popover>
    );
}

export default AddClient;
