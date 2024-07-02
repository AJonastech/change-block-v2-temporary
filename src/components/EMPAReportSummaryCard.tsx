import useIsMounted from "@/lib/hooks/useIsMounted";
import { Skeleton } from "@nextui-org/react";
import React from "react";

interface EMPAReportCardsProps {
  cards: TEMPAReportSummaryCard[];
}

const EMPAReportCards: React.FC<EMPAReportCardsProps> = ({ cards }) => {
  const isMounted = useIsMounted();

  return (
    <div className="grid xl:grid-cols-2 grid-flow-row gap-4 !space-y-0">
      {cards.map((card, cardIndex) => (
        <div
          key={cardIndex}
          className="bg-white p-4 rounded-xl border !space-y-0 "
        >
          <div className="flex items-center gap-3 !space-y-0">
            <Skeleton isLoaded={isMounted} className="rounded-lg">
              <h2 className="text-xl !my-0 text-dark-200 font-semibold">
                {card.title}
              </h2>
            </Skeleton>
          </div>
          <Skeleton isLoaded={isMounted} className="rounded-lg">
            {" "}
            <p className=" text-gray-600">{card.description}</p>
          </Skeleton>

          <div className=" flex flex-col gap-3 !my-0 !space-y-0 relative">
            {card.summaries.map((summary, summaryIndex) => (
              <div
                key={summaryIndex}
                className=" gap-2 p-2 !space-y-0 border rounded-lg"
              >
                <Skeleton isLoaded={isMounted} className="rounded-lg !my-0">
                  {" "}
                  <h3 className="font-medium text-dark-200 !my-0 ">
                    {summary.title}
                  </h3>
                </Skeleton>

                <div className="text-dark-100 text-base overflow-hidden  text-ellipsis !my-0 !py-0 !space-y-0 ">
                  <Skeleton isLoaded={isMounted} className="rounded-lg !my-0 ">
                    {" "}
                    <span className="text-nowrap  !my-0 !py-0 !space-y-0">
                      {" "}
                      {summary.summary[0] as unknown as string}
                    </span>{" "}
                  </Skeleton>
                </div>
              </div>
            ))}
            <div className="h-[10rem] w-full bg-gradient-to-t from-white/60 to-white/0 absolute bottom-0 left-0 "></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EMPAReportCards;
