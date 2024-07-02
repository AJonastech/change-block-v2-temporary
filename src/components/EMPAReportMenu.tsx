"use client";
import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
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

const EMPAReportMenu = () => {
  const data = useSearchParam("data");
  const { segment } = useParams();
  return (
    <div
      className={` ${
        data !== null && segment !== "home" ? "block" : "hidden"
      }    absolute right-0 top-0 transition-all  duration-500`}
    >
      {" "}
      <SlideIntoView from="right">
        <div className="flex justify-between items-center gap-3">
          {" "}
          <ButtonGroup
            color={
              `` as
                | "default"
                | "primary"
                | "secondary"
                | "success"
                | "warning"
                | "danger"
                | undefined
            }
            className="bg-white text-lg rounded-md"
          >
            <Button isIconOnly className="">
              <RefreshIcon />
            </Button>
            <Button className="border-x" isIconOnly>
              <AddPersonIcon />
            </Button>
            <Button className="" isIconOnly>
              <ChatIcon />
            </Button>
            <Button className="border-x" isIconOnly>
              <StackIcon />
            </Button>
            <Button isIconOnly>
              <ShareIcon />
            </Button>
          </ButtonGroup>
          <Button startContent={<EditIcon />} color="primary">
            Edit
          </Button>
        </div>
      </SlideIntoView>
    </div>
  );
};

export default EMPAReportMenu;
