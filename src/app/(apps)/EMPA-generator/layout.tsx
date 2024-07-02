import EMPAReportMenu from "@/components/EMPAReportMenu";
import React, { ReactNode } from "react";

const EMPALayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" w-full h-full !max-h-full overflow-y-auto   flex">
      <EMPAReportMenu />

      <div className="h-full w-full !min-w-full">{children} </div>
    </div>
  );
};

export default EMPALayout;
