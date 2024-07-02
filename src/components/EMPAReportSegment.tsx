"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-use";
import EMPAReportSegmentHeaderCard from "./EMPAReportSegmentHeaderCard";
import { EMPAReportSteps } from "./EMPAGeneratorNav";
import RichInput from "./RichInput";

const EMPAReportSegment = ({
  data,
  section,
}: {
  data?: any;
  section: string;
}) => {
  const location = useLocation();
  const { segment } = useParams();

  const [step, setStep] = useState<TStep>();

  const curentSegment = location?.pathname?.split("/")[2];

  useEffect(() => {
    const newStep = EMPAReportSteps.find((step) => {
      if (step.title === segment) {
        return step;
      } else {
        return "";
      }
    });
    setStep(newStep as TStep);
  }, [curentSegment, section, segment]);

  console.log({ section });

  return (
    <div className="flex  flex-col justify-between gap-4 relative h-full ">
      <div className="flex flex-col gap-4 h-full">
        <div className=" bg-background items-center rounded-full py-2 w-fit px-4 flex gap-2 capitalize">
          {step?.icon as string}
          {step?.title as string}{" "}
        </div>

        <EMPAReportSegmentHeaderCard title={section as string}>
          We propose completing this engagement within a 17 week timeframe, with
          regular progress updates and checkpoints. The iterative approach to
          rapid design and prototyping will both inform and test the target
          state, implementation strategy and business case. Prototyping and
          validation work completed at the end of Stage 1 will help shape and
          fast track the vendor selection process in Stages 2 and 3.
        </EMPAReportSegmentHeaderCard>
      </div>

      {data}
      <RichInput />
    </div>
  );
};

export default EMPAReportSegment;
