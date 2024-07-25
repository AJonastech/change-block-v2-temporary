import React, { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import {
  ChatIcon,
  EditIcon,
  RefreshIcon,
  ShareIcon,
  AddUserIcon,
  VersionIcon,
} from "@/icons";
import { useParams, useSearchParams } from "next/navigation";
import SlideIntoView from "./SlideIntoView";
import AddCollaborator from "./forms/AddEMPACollaborator";
import EMPAModal from "./modals/EMPAModal";
import ShareEMPAForm from "./forms/ShareEMPAForm";
import EMPAVersionHistory from "./EMPAVersionHistory";
import EMPAPreviewReport from "./EMPAPreviewReport";
import useReportStepsStore from "@/store/useReportStepsStore";
import EMPAPreviewConfirmation from "./EMPAPreviewConfirmation";
import { parseMKD } from "@/config/parseMKD";
import { EMPAReportSteps } from "@/config/reportStepConfig";

const EMPAReportMenu = ({
  toggleChatDrawer,
  toggleEditor,
  isEditor,
}: {
  toggleChatDrawer: () => void;
  toggleEditor: () => void;
  isEditor: boolean;
}) => {
  const searchParam = useSearchParams();
  const section = searchParam.get("section");
  const { segment } = useParams();
  const { currentSubStep } = useReportStepsStore();
  const isDisabled =
    currentSubStep?.isLocked && currentSubStep.title === section;
  const [showPreviewReport, setShowPreviewReport] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [filename, setFilename] = useState("EMPA_Report.pdf");

  const handlePreview = (type: "current" | "entire") => {
    if (type === "current") {
      const currentStep = EMPAReportSteps.find(
        (step) => step.title === segment
      );
      const currentSection = currentStep?.substeps.find(
        (subStep) => subStep.title === section
      );
      setFilename(`EMPA_Report-${section}.pdf`);
      setPreviewContent(
        parseMKD(
          ((currentSection.markupTitle + currentSection?.data) as string) || ""
        )
      );
    } else {
      setPreviewContent(parseMKD(concatenateMarkdown(EMPAReportSteps)));
      setFilename("EMPA_Report.pdf");
    }
    setShowPreviewReport(true);
  };

  return (
    <div className={`absolute top-0 right-0`}>
      <SlideIntoView from="right">
        <div className="flex w-fit justify-between items-center gap-3">
          <div className="bg-white flex items-center justify-evenly divide-x-1 text-lg rounded-md">
            <Tooltip content="Refresh">
              <Button
                isDisabled={isDisabled}
                isIconOnly
                className="rounded-none"
                variant="light"
              >
                <RefreshIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Add Collaborator">
              <EMPAModal
                className="min-w-[700px] w-[700px]"
                buttonIcon={<AddUserIcon />}
              >
                <AddCollaborator />
              </EMPAModal>
            </Tooltip>
            <Tooltip content="Open Chat">
              <Button
                isIconOnly
                className="rounded-none"
                isDisabled={isDisabled}
                variant="light"
                onPress={toggleChatDrawer}
              >
                <ChatIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Version History">
              <EMPAVersionHistory buttonIcon={<VersionIcon />} />
            </Tooltip>
            <Tooltip content="Share EMPA Report">
              <EMPAModal
                className="min-w-[600px] w-[600px]"
                buttonIcon={<ShareIcon />}
              >
                <ShareEMPAForm />
              </EMPAModal>
            </Tooltip>
          </div>
          <EMPAModal
            className={`${
              showPreviewReport ? "min-w-[968px]" : "min-w-[650px]"
            }`}
            buttonElement={
              <Button
                color="primary"
                className="!bg-green-300 !px-4 py-[5px] max-w-[6.5rem] w-[6.5rem]"
              >
                Preview
              </Button>
            }
          >
            {showPreviewReport ? (
              <EMPAPreviewReport
                filename={filename}
                htmlContent={previewContent}
              />
            ) : (
              <EMPAPreviewConfirmation onPreview={handlePreview} />
            )}
          </EMPAModal>
          <Button
            isDisabled={isDisabled}
            startContent={<EditIcon />}
            color="primary"
            className="!bg-primary disabled:cursor-not-allowed !px-4 py-[5px] max-w-[6.5rem] w-[6.5rem]"
            onPress={toggleEditor}
          >
            {isEditor ? "Save" : "Edit"}
          </Button>
        </div>
      </SlideIntoView>
    </div>
  );
};

export default EMPAReportMenu;

const concatenateMarkdown = (steps: TStep[]) => {
  return steps.reduce((acc, step) => {
    const stepMarkdown = step.substeps.reduce((subAcc, subStep) => {
      if (subStep.data) {
        return (
          subAcc +
          subStep.markupTitle +
          subStep.description +
          subStep.data +
          "\n\n"
        );
      }
      return subAcc;
    }, "");
    return acc + stepMarkdown;
  }, "");
};
