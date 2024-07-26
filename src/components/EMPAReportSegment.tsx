"use client";
import React, { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import { useLocation } from "react-use";
import { Button, Skeleton } from "@nextui-org/react";

import EMPAReportSegmentHeaderCard from "./EMPAReportSegmentHeaderCard";
import EMPAReportMenu from "./EMPAReportMenu";
import CommentsDrawer from "./CommentsDrawer";
import RichInput from "./RichInput";
import NovelEditorAndDisplay from "./NovelEditorAndDisplay";

import useIsMounted from "@/hooks/useIsMounted";
import useReportStepsStore from "@/store/useReportStepsStore";
import { EMPAReportSteps } from "@/config/reportStepConfig";
import markdownToProseMirror from "@/config/markdownToProseMirror";

const EMPAReportSegment = ({ section }: { section: string }) => {
  // Get the current location and parameters from the URL
  const location = useLocation();
  const { segment } = useParams();
  const decodedSegment = decodeURIComponent(segment as string);
  const decodedSection = decodeURIComponent(section as string);

  // Custom hooks and state management
  const isMounted = useIsMounted();
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentSubStep, toggleSubStepLock, reportSteps } =
    useReportStepsStore();

  // State variables for step and substep
  const [step, setStep] = useState<TStep | null>(null);
  const [subStep, setSubStep] = useState<TSubStep | null>(null);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [isChatDrawerOpen, setChatDrawerOpen] = useState<boolean>(false);

  // Determine if the current substep is locked
  const isLocked =
    currentSubStep?.isLocked && currentSubStep.title === decodedSection;
  const currentSegment = location?.pathname?.split("/")[2];

  // Update step and substep based on URL changes
  useEffect(() => {
    const currentStep = reportSteps.find(
      (step) => step.title === decodedSegment
    );
    const currentSection = currentStep?.substeps?.find(
      (subStep) => subStep.title === decodedSection
    );

    if (currentStep && currentSection) {
      setStep(currentStep as TStep);
      setSubStep(currentSection);
    } else {
      setStep(null);
      setSubStep(null);
    }
  }, [currentSegment, decodedSection, decodedSegment, reportSteps, section]);

  // Handle scrolling behavior when the chat drawer is toggled
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: isChatDrawerOpen ? containerRef.current.scrollHeight : 0,
        behavior: "smooth",
      });
    }
  }, [isChatDrawerOpen]);

  // Toggle functions for chat drawer and editor
  const toggleChatDrawer = () => setChatDrawerOpen((prev) => !prev);
  const toggleEditor = () => setIsEditor((prev) => !prev);

  // Memoize content transformation from markdown to ProseMirror format
  const markupContent = useMemo(
    () => (subStep?.data as string) || "",
    [subStep]
  );
  const titleMarkupContent = useMemo(
    () => (subStep?.markupTitle as string) || "",
    [subStep]
  );
  const descriptionMarkupContent = useMemo(
    () => (subStep?.description as string) || "",
    [subStep]
  );

  const novelJSONContent = useMemo(
    () => (markupContent ? markdownToProseMirror(markupContent) : null),
    [markupContent]
  );
  const titleNovelJSONContent = useMemo(
    () =>
      titleMarkupContent ? markdownToProseMirror(titleMarkupContent) : null,
    [titleMarkupContent]
  );
  const descriptionNovelJSONContent = useMemo(
    () =>
      descriptionMarkupContent
        ? markdownToProseMirror(descriptionMarkupContent)
        : null,
    [descriptionMarkupContent]
  );

  const handleUnlockDocument = () => {
    const stepIndex = reportSteps.findIndex(
      (step) => step.title === decodedSegment
    );
    const subStepIndex = reportSteps[stepIndex]?.substeps.findIndex(
      (subStep) => subStep.title === decodedSection
    );

    if (stepIndex !== -1 && subStepIndex !== -1) {
      toggleSubStepLock(stepIndex, subStepIndex);
    }
  };

  // Render an error message if step or subStep is not found
  if (!step || !subStep) {
    return (
      <div className="flex justify-center items-center min-h-full h-full">
        <h1 className="text-red-500 text-2xl font-semibold flex flex-col gap-2 items-center">
          <span className=""> 404 Error:</span>{" "}
          <span className="">
            The specified segment or section does not exist.
          </span>
        </h1>
      </div>
    );
  }

  return (
    <Suspense>
      <div
        className="flex flex-col justify-start min-h-full h-full no-scrollbar overflow-y-auto mb-[3rem]"
        ref={containerRef}
      >
        {/* Menu Component */}
        <div>
          <EMPAReportMenu
            toggleChatDrawer={toggleChatDrawer}
            toggleEditor={toggleEditor}
            isEditor={isEditor}
          />
        </div>

        {/* Document Lock Indicator */}
        {isLocked && (
          <div className="bg-grey-10 mb-7 w-full rounded-3xl px-4 py-2 flex items-center justify-between">
            <p className="font-satoshi font-semibold text-lg text-grey-500">
              Document locked by oluwole fagbohun
            </p>
            <Button
              onClick={handleUnlockDocument}
              className="!bg-grey-500 text-lemon-50 text-lg leading-[25.2px] w-[202px] h-[58px] py-4 px-6"
            >
              Unlock Document
            </Button>
          </div>
        )}

        {/* Step Indicator */}
        <div className="flex flex-col gap-4 h-fit">
          <Skeleton isLoaded={isMounted} className="rounded-full w-[15rem]">
            <div className="bg-background items-center rounded-full py-2 w-fit px-4 flex gap-2 capitalize text-nowrap">
              <step.icon />
              {step?.title}
            </div>
          </Skeleton>

          {/* Header Card for the Section */}
          {titleNovelJSONContent && (
            <EMPAReportSegmentHeaderCard
              titleNovelJSONContent={titleNovelJSONContent}
              titleMarkupContent={titleMarkupContent}
              descriptionNovelJSONContent={descriptionNovelJSONContent}
              descriptionMarkupContent={descriptionMarkupContent}
              isEditor={isEditor}
            />
          )}
        </div>

        {/* Main Content Editor/Display */}
        <div className="h-full">
          {novelJSONContent && (
            <div className="h-max min-h-max">
              <NovelEditorAndDisplay
                novelJSONContent={novelJSONContent}
                markupContent={markupContent}
                isEditor={isEditor}
              />
            </div>
          )}
        </div>

        {/* Comments Drawer */}
        <div className="w-full">
          <CommentsDrawer
            onClick={toggleChatDrawer}
            isOpen={isChatDrawerOpen}
          />
        </div>

        {/* Rich Input at the Bottom */}
        <div className="absolute bottom-[32px] left-0 gap-2 w-full flex">
          <div className="w-full mx-auto flex flex-col">
            <div className="h-8 w-full bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
            <RichInput />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default EMPAReportSegment;
