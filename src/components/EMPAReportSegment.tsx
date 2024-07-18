"use client";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { useLocation } from "react-use";
import EMPAReportSegmentHeaderCard from "./EMPAReportSegmentHeaderCard";
import { EMPAReportSteps } from "@/config/reportStepConfig";
import RichInput from "./RichInput";
import Markdown from "./Markdown";
import CommentsDrawer from "./CommentsDrawer";
import EMPAReportMenu from "./EMPAReportMenu";
import useIsMounted from "@/hooks/useIsMounted";
import { Skeleton } from "@nextui-org/react";
import NovelEditorAndDisplay from "./NovelEditorAndDisplay";
import { markdownContent, markdownContent2 } from "@/mockdata/EMPASectionsMKD";
import markdownToProseMirror from "@/config/markdownToProseMirror";

const EMPAReportSegment = ({ section }: { section: string }) => {
  const location = useLocation();
  const { segment } = useParams();
  const isMounted = useIsMounted();
  const [step, setStep] = useState<TStep>(EMPAReportSteps[0]);
  const [subStep, setSubStep] = useState<TSubStep>(step.substeps[0]);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [isChatDrawerOpen, setChatDrawerOpen] = useState<boolean>(false);

  const curentSegment = location?.pathname?.split("/")[2];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentStep = EMPAReportSteps.find((step) => {
      if (step.title === segment) {
        return step;
      } else {
        return "";
      }
    });
    const currentSection = currentStep?.substeps?.find((subStep) => {
      if (subStep.title === section) {
        return subStep;
      } else {
        return "";
      }
    });
    currentStep && setStep(currentStep as TStep);
    currentSection && setSubStep(currentSection);
  }, [curentSegment, section, segment]);

  const toggleChatDrawer = () => {
    setChatDrawerOpen((prev) => !prev);
  };
  const toggleEditor = () => {
    setIsEditor((prev) => !prev);
  };

  useEffect(() => {
    if (containerRef.current) {
      if (isChatDrawerOpen) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      } else {
        containerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [isChatDrawerOpen]);

  const markupContent = subStep ? (subStep.data as string) : "";
  const novelJSONContent = markdownToProseMirror(markupContent);

  console.log({ markupContent, novelJSONContent });
  return (
    <Suspense>
      <div
        className="flex  flex-col justify-start min-h-full h-full no-scrollbar  overflow-y-auto mb-[3rem]  "
        ref={containerRef}
      >
        <div className="">
          <EMPAReportMenu
            toggleChatDrawer={toggleChatDrawer}
            toggleEditor={toggleEditor}
            isEditor={isEditor}
          />
        </div>
        <div className="flex flex-col gap-4 h-fit">
          <Skeleton isLoaded={isMounted} className="rounded-full w-[10rem]">
            {" "}
            <div className="bg-background items-center rounded-full py-2 w-fit px-4 flex gap-2 capitalize">
              <step.icon />
              {step?.title as string}
            </div>
          </Skeleton>

          <EMPAReportSegmentHeaderCard title={section as string}>
            We propose completing this engagement within a 17 week timeframe,
            with regular progress updates and checkpoints. The iterative
            approach to rapid design and prototyping will both inform and test
            the target state, implementation strategy and business case.
            Prototyping and validation work completed at the end of Stage 1 will
            help shape and fast track the vendor selection process in Stages 2
            and 3.
          </EMPAReportSegmentHeaderCard>
        </div>
        {subStep?.data && (
          <div className="h-max min-h-max    overflow-y-uto">
            <div className="h-[20rem] ">
              <NovelEditorAndDisplay
                novelJSONContent={novelJSONContent}
                markupContent={markupContent}
                isEditor={isEditor}
              />
            </div>
          </div>
        )}
        <div className="w-full ">
          <CommentsDrawer
            onClick={toggleChatDrawer}
            isOpen={isChatDrawerOpen}
          />
        </div>
        <div className=" absolute bottom-[32px] left-0  gap-2 w-full flex   ">
          <div className=" w-full mx-auto flex flex-col ">
            {" "}
            <div className="h-8  w-full bg-gradient-to-b  from-transparent via-transparent to-black/10 "></div>{" "}
            <RichInput />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default EMPAReportSegment;
