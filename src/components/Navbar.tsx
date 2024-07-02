"use client";
import { Button } from "@nextui-org/react";

import { GoSearch } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import React from "react";

const Navbar = () => {
  
  return (
    <div
      className={`absolute top-0  z-50 left-0 w-full px-[1rem] transition-all duration-300`}
    >
      <div className=" flex gap-3">
        {" "}
        <div className="flex justify-center bg-white rounded-full w-full px-[2rem]  items-center gap-3">
          <GoSearch />{" "}
          <input
            placeholder="Search by keyword, phrases, trending topics"
            className="bg-transparent hover:bg-transparent outline-none w-fit max-w-[40rem] "
          />
        </div>
        <Button isIconOnly className="bg-white">
          <BsThreeDots />{" "}
        </Button>
      </div>
    </div>
  ); 
};

export default Navbar;
