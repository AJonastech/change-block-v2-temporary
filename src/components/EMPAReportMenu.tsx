"use client";
import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import {
  AddPersonIcon,
  ChatIcon,
  EditIcon,
  RefreshIcon,
  StackIcon,
  ShareIcon,
} from "@/icons";
import { useParams } from "next/navigation";
import SlideIntoView from "./SlideIntoView";
import { useSearchParam } from "react-use";
import AddCollaborator from "./forms/AddEMPACollaborator";
import EMPAModal from "./modals/EMPAModal";
import ShareEMPAForm from "./forms/ShareEMPAForm";
import EMPAVersionHistory from "./EMPAVersionHistory";
import EMPAPreviewReport from "./EMPAPreviewReport";


const EMPAReportMenu = ({
  toggleChatDrawer,
  toggleEditor,
  isEditor,
}: {
  toggleChatDrawer: () => void;
  toggleEditor: () => void;
  isEditor: boolean;
}) => {
  const data = useSearchParam("data");
  const { segment } = useParams();

  return (
    <div className={`absolute top-0 right-0`}>
      <SlideIntoView from="right">
        <div className="flex w-fit justify-between items-center gap-3">
          <div className="bg-white flex items-center justify-evenly divide-x-1 text-lg rounded-md">
            <Tooltip content="Refresh">
              <Button isIconOnly className="rounded-none" variant="light">
                <RefreshIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Add Collaborator">
              <EMPAModal
                className="min-w-[700px] w-[700px]"
                buttonIcon={<AddPersonIcon />}
              >
                <AddCollaborator />
              </EMPAModal>
            </Tooltip>
            <Tooltip content="Open Chat">
              <Button
                isIconOnly
                className="rounded-none"
                variant="light"
                onPress={toggleChatDrawer}
              >
                <ChatIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Version History">
              <EMPAVersionHistory buttonIcon={<StackIcon />} />
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
        <EMPAModal     className="min-w-[1000px] w-[1000px]" buttonElement={ <Button
            
            color="primary"
            className="!bg-green-300 !px-4 py-[5px] max-w-[6.5rem] w-[6.5rem]"
            onPress={toggleEditor}
          >
           Preview
          </Button>}>
         <EMPAPreviewReport/>
        </EMPAModal>
          
          <Button
            startContent={<EditIcon />}
            color="primary"
            className="!bg-primary !px-4 py-[5px] max-w-[6.5rem] w-[6.5rem]"
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
