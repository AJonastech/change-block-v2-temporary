"use client";
import React from "react";
import { Button } from "@nextui-org/react";
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
import EMPAEditForm from "./forms/EMPAEditForm";

const EMPAReportMenu = ({
  toggleChatDrawer,
}: {
  toggleChatDrawer: () => void;
}) => {
  const data = useSearchParam("data");
  const { segment } = useParams();
  console.log(segment, data);
  return (
    <div className={`absolute top-0 right-0 `}>
      {" "}
      <SlideIntoView from="right">
        <div className="flex w-fit justify-between items-center gap-3">
          {" "}
          <div className="bg-white flex items-center justify-evenly divide-x-1 text-lg rounded-md">
            <Button isIconOnly className="rounded-none" variant="light">
              <RefreshIcon />{" "}
            </Button>
            <EMPAModal
              className="min-w-[700px] w-[700px] "
              buttonIcon={<AddPersonIcon />}
            >
              <AddCollaborator />
            </EMPAModal>

            <Button
              isIconOnly
              className="rounded-none"
              variant="light"
              onPress={toggleChatDrawer}
            >
              <ChatIcon />
            </Button>
            <EMPAVersionHistory buttonIcon={<StackIcon />} />

            <EMPAModal
              className="min-w-[600px] w-[600px]  "
              buttonIcon={<ShareIcon />}
            >
              <ShareEMPAForm />
            </EMPAModal>
          </div>
          <EMPAModal
            className="min-w-[982px] w-[982px]  "
            buttonElement={
              <Button startContent={<EditIcon />} color="primary">
                Edit
              </Button>
            }
          >
            <EMPAEditForm />
          </EMPAModal>
        </div>
      </SlideIntoView>
    </div>
  );
};

export default EMPAReportMenu;
