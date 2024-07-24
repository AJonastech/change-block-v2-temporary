"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { useLocation } from "react-use";
import EMPAReportSegmentHeaderCard from "./EMPAReportSegmentHeaderCard";
import { EMPAReportSteps } from "@/config/reportStepConfig";
import RichInput from "./RichInput";
import Markdown from "./Markdown";
import CommentsDrawer from "./CommentsDrawer";
import EMPAReportMenu from "./EMPAReportMenu";
import useIsMounted from "@/hooks/useIsMounted";
import { Button, Skeleton } from "@nextui-org/react";
import NovelEditorAndDisplay from "./NovelEditorAndDisplay";
import markdownToProseMirror from "@/config/markdownToProseMirror";
import useReportStepsStore from "@/store/useReportStepsStore";

const EMPAReportSegment = ({ section }: { section: string }) => {
  const location = useLocation();
  const { segment } = useParams();
  const isMounted = useIsMounted();
  const [step, setStep] = useState<TStep>(EMPAReportSteps[0]);
  const [subStep, setSubStep] = useState<TSubStep>(step.substeps[0]);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [isChatDrawerOpen, setChatDrawerOpen] = useState<boolean>(false);
  const searchParam = useSearchParams();

  const { currentSubStep } = useReportStepsStore();
  const isLocked = currentSubStep?.isLocked && currentSubStep.title === section;

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
  const novelJSONContent =
    markupContent && markdownToProseMirror(markupContent);
  const titleMarkupContent = subStep ? (subStep.markupTitle as string) : "";
  const descriptionMarkupContent = subStep
    ? (subStep.description as string)
    : "";
  const descriptionNovelJSONContent =
    descriptionMarkupContent && markdownToProseMirror(descriptionMarkupContent);

  const titleNovelJSONContent =
    titleMarkupContent && markdownToProseMirror(titleMarkupContent);

  console.log({ currentSubStep, subStep });
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
        {isLocked && (
          <div className="bg-grey-10 mb-7 w-full rounded-3xl px-4 py-2 flex items-center justify-between">
            <p className="font-satoshi font-semibold text-lg text-grey-500">
              Document locked by oluwole fagbohun
            </p>
            <Button className="!bg-grey-500 text-lemon-50 text-lg leading-[25.2px] w-[202px] h-[58px] py-4 px-6">
              Unlock Document
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-4 h-fit">
          <Skeleton isLoaded={isMounted} className="rounded-full w-[10rem]">
            {" "}
            <div className="bg-background items-center rounded-full py-2 w-fit px-4 flex gap-2 capitalize">
              <step.icon />
              {step?.title as string}
            </div>
          </Skeleton>
          {subStep?.title && (
            <EMPAReportSegmentHeaderCard
              titleNovelJSONContent={titleNovelJSONContent}
              titleMarkupContent={titleMarkupContent}
              descriptionNovelJSONContent={descriptionNovelJSONContent}
              descriptionMarkupContent={descriptionMarkupContent}
              isEditor={isEditor}
            />
          )}
        </div>
        <div className="h-full">
          {subStep?.data && (
            <div className="h-max min-h-max   ">
              <NovelEditorAndDisplay
                novelJSONContent={novelJSONContent}
                markupContent={markupContent}
                isEditor={isEditor}
              />
            </div>
          )}
        </div>
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
