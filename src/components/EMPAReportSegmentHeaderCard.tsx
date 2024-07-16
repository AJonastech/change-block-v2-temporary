import useIsMounted from "@/hooks/useIsMounted";
import { Skeleton } from "@nextui-org/react";
import React, { ReactNode } from "react";

const EMPAReportSegmentHeaderCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const isMounted = useIsMounted();
  return (
    <div className="relative text-dark-100   w-[calc(100%-10px)] mx-auto">
      <div className="relative flex flex-col overflow-hidden gap-3 z-30 bg-secondary-100 px-8 py-4 rounded-lg !space-y-0">
        <Skeleton isLoaded={isMounted} className="rounded-lg max-w-[60%]">
          <h4 className="heading-h4 !my-0 font-semibold w-fit capitalize text-green-500">
            {title}
          </h4>
        </Skeleton>
        <Skeleton isLoaded={isMounted} className="rounded-lg">
          <span className="text-[18px]"> {children}</span>
        </Skeleton>
      </div>
      <div className="absolute z-10 h-full w-[10rem] bg-primary rounded-xl -translate-x-[5px] left-0 top-0"></div>
    </div>
  );
};

export default EMPAReportSegmentHeaderCard;
