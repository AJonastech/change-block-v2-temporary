"use client";
import React, { ReactNode } from "react";

const SideBarDrawer = ({ children }: { children: ReactNode }) => {
  return (
    <aside className=" h-full w-[18rem] bg-white rounded-r-2xl">
      {children}
    </aside>
  );
};

export default SideBarDrawer;
