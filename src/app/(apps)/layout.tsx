import BreadCrumb from "@/components/BreadCrumb";
import Sidebar from "@/components/Sidebar";
import React, { Suspense } from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-screen min-w-full w-full h-screen p-4 max-h-screen prose">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
      </Suspense>
      <div className="px-4 max-h-full bg-background w-full flex flex-col gap-8 overflow-x-hidden">
        <div className="w-full flex flex-col gap-7 h-full relative">
          <BreadCrumb />

          <div className=" w-full h-full   flex-grow rounded-xl !max-h-full overflow-y-auto   flex">
            <div className="w-full  overflow-x-hidden  no-scrollbar overflow-auto bg-white  p-8 rounded-xl ">
              {children}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default layout;
