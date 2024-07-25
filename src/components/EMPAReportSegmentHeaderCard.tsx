"use client";
import useIsMounted from "@/hooks/useIsMounted";
import { Skeleton } from "@nextui-org/react";
import React from "react";
import NovelEditorAndDisplay from "./NovelEditorAndDisplay";

const EMPAReportSegmentHeaderCard = ({
  titleNovelJSONContent,
  titleMarkupContent,
  descriptionNovelJSONContent,
  descriptionMarkupContent,
  isEditor,
}: {
  titleNovelJSONContent: ProseMirrorNode | null | string;
  titleMarkupContent: string;
  descriptionMarkupContent: string;
  descriptionNovelJSONContent: ProseMirrorNode | null | string;
  isEditor: boolean;
}) => {
  const isMounted = useIsMounted();

  return (
    <div className="relative text-dark-100   w-[calc(100%-10px)] mx-auto">
      <div className="relative flex flex-col overflow-hidden gap-3 z-30 bg-secondary-100 px-8 pb-4 rounded-lg !space-y-0">
        <Skeleton isLoaded={isMounted} className="rounded-lg">
          <NovelEditorAndDisplay
            novelJSONContent={titleNovelJSONContent}
            markupContent={titleMarkupContent}
            isEditor={isEditor}
            className="!heading-h4 !text-4xl !my-0 font-semibold w-full capitalize text-green-500"
          />
        </Skeleton>
        <Skeleton isLoaded={isMounted} className="rounded-lg">
          <NovelEditorAndDisplay
            novelJSONContent={descriptionNovelJSONContent}
            markupContent={descriptionMarkupContent}
            isEditor={isEditor}
            className="w-full"
          />
        </Skeleton>
      </div>
      <div className="absolute z-10 h-full w-[10rem] bg-primary rounded-xl -translate-x-[5px] left-0 top-0"></div>
    </div>
  );
};

export default EMPAReportSegmentHeaderCard;
