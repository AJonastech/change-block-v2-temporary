import BreadCrumb from "@/components/BreadCrumb";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col gap-7 h-full relative">
      <BreadCrumb />

      <div className=" w-full h-full   flex-grow rounded-xl !max-h-full overflow-y-auto   flex">
        <div className="w-full  overflow-x-hidden  no-scrollbar overflow-auto bg-white  p-8 rounded-xl ">
          {children}{" "}
        </div>
      </div>
    </div>
  );
}

export default layout;
