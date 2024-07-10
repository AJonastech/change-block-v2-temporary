import useIsMounted from "@/hooks/useIsMounted";
import { Skeleton } from "@nextui-org/react";
import React from "react";
import { ArrowRight } from "iconsax-react";
interface EMPAReportCardsProps {
  cards: TEMPAReportSummaryCard[];
}

const EMPAReportCards: React.FC<EMPAReportCardsProps> = ({ cards }) => {
  const isMounted = useIsMounted();

  return (
    <div className="grid xl:grid-cols-2 grid-flow-row gap-4 !space-y-0">

      {cards.map((card, cardIndex) => (
        <div className="group cursor-pointer" key={cardIndex}>
          <div className="flex mb-7   w-fit  items-center gap-3 !space-y-0">
            <Skeleton isLoaded={isMounted} className="rounded-lg">
              <h6 className="heading-h6 !my-0 text-grey-500 font-generalSans font-semibold">
                {card.title}
              </h6>

            </Skeleton>
            <ArrowRight size={15} strokeWidth={3} className="text-grey-700 group-hover:ml-3 font-bold transition-all duration-300 ease-in-out" />
          </div>
          <div

            className="bg-white group-hover:shadow-lg p-4 flex flex-col gap-5 rounded-xl border !space-y-0 "
          >

            <Skeleton isLoaded={isMounted} className="rounded-lg">
              {" "}
              <p className=" text-grey-300 font-satoshi text-lg leading-[25.2px]">{card.description}</p>
            </Skeleton>

            <div className="  flex flex-col gap-3 !my-0 !space-y-0 relative">
              {card.summaries.map((summary, summaryIndex) => (
                <div
                  key={summaryIndex}
                  className=" gap-2 p-2 !space-y-0 border rounded-lg"
                >
                  <Skeleton isLoaded={isMounted} className="rounded-lg !my-0">
                    {" "}
                    <h6 className="font-satoshi text-grey-300 font-semibold text-lg leading-[25.2px] !my-0 ">
                      {summary.title}
                    </h6>
                  </Skeleton>

                  <div className="text-dark-100 text-base overflow-hidden  text-ellipsis !my-0 !py-0 !space-y-0 ">
                    <Skeleton isLoaded={isMounted} className="rounded-lg !my-0 ">
                      {" "}
                      <span className="text-nowrap text-grey-300 font-satoshi text-lg  !my-0 !py-0 !space-y-0">
                        {" "}
                        {summary.summary[0] as unknown as string}
                      </span>{" "}
                    </Skeleton>
                  </div>
                </div>
              ))}
              <div className="h-[7rem] w-full bg-gradient-to-t from-white/60 to-white/0 absolute bottom-0 left-0 "></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EMPAReportCards;
