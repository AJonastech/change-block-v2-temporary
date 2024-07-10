import AppsBadge from "@/components/AppsBadge";
import EMPAReportMenu from "@/components/EMPAReportMenu";
import React, { ReactNode } from "react";

const EMPALayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full">
      <AppsBadge  />
      <div className=" w-full h-full mt-7 !max-h-full overflow-y-auto   flex">

        <EMPAReportMenu />

        <div className="h-full no-scrollbar w-full !min-w-full">{children} </div>
      </div>
    </div>
  );
};

export default EMPALayout;
