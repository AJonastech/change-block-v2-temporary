"use client";

import React, { ReactElement, useState, useMemo } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { CgClose } from "react-icons/cg";

type Version = {
  version: string;
  title: string;
  author: string;
  time: string;
};

const versionData: Version[] = [
  {
    version: "v6.0",
    title: "Data Collection Improvements",
    author: "John Doe",
    time: "2 hours ago",
  },
  {
    version: "v5.0",
    title: "Reviewed Executive summary",
    author: "John Doe",
    time: "Yesterday",
  },
  {
    version: "v5.0",
    title: "New Images added to EMPA outcomes",
    author: "John Doe",
    time: "Yesterday",
  },
  {
    version: "v5.0",
    title: "Added chart to standard screening",
    author: "John Doe",
    time: "Yesterday",
  },
  {
    version: "v4.0",
    title: "New Images added to EMPA outcomes",
    author: "John Doe",
    time: "2 days ago",
  },
];

const VersionHistory = () => {
  const [versions, setVersions] = useState<Version[]>(versionData);

  const renderedVersions = useMemo(() => {
    const versionSet = new Set<string>();
    return versions.map((version) => {
      const isFirstAppearance = !versionSet.has(version.version);
      if (isFirstAppearance) {
        versionSet.add(version.version);
      }
      return {
        ...version,
        isFirstAppearance,
      };
    });
  }, [versions]);

  return (
    <div className="w-[506px] flex flex-col items-center gap-8 bg-white rounded-2xl pb-8">
      <div className="flex justify-between items-center border-b p-8 w-full">
        <h6 className="font-bold heading-h6 text-grey-700 text-[22px]">
          Version History
        </h6>
      </div>
      <ul className="relative px-8 flex flex-col gap-8  w-full">
        {renderedVersions.map((version, index) => (
          <li key={index} className="">
            <div className="flex items-center relative z-20">
              <div className="mr-4 flex flex-col items-center justify-between w-[4rem] h-fit">
                {version.isFirstAppearance ? (
                  <div
                    className={`text-center font-satoshi font-medium text-[15px] z-20 rounded-full w-full px-4 py-2 ${
                      index === 0
                        ? "bg-black text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {version.version}{" "}
                  </div>
                ) : (
                  <div className="h-2 w-2 rounded-full bg-grey-30 my-auto"></div>
                )}

                {index < versions.length - 1 && (
                  <div className="absolute left top-0 h-[200%] border-l border-grey-30"></div>
                )}
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="block font-medium text-[18px] text-grey-700">
                  {version.title}
                </span>
                <span className="block text-grey-300 ">
                  {version.author} ・ {version.time}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-fit mx-auto pt-3">
        {" "}
        <Button
          variant="bordered"
          className="text-grey-500 text-[18px] w-fit border-[1.5px] mx-auto font-medium"
        >
          See More
        </Button>
      </div>
    </div>
  );
};

export default function EMPAVersionHistory({
  buttonTitle,
  buttonElement,
  buttonIcon,
  className,
}: {
  buttonTitle?: string;
  className?: string;
  buttonElement?: ReactElement;
  buttonIcon?: ReactElement;
}) {
  const [visible, setVisible] = useState(false);
  const closePopover = () => setVisible(false);

  return (
    <Popover isOpen={visible} onOpenChange={setVisible} placement="bottom">
      <PopoverTrigger>
        {buttonElement ? (
          React.cloneElement(buttonElement, { onClick: () => setVisible(true) })
        ) : (
          <Button
            variant="light"
            className="w-fit rounded-none"
            isIconOnly={buttonIcon ? true : false}
            onClick={() => setVisible(true)}
          >
            {buttonIcon || buttonTitle || "open"}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="relative p-0 rounded-2xl">
        <Button
          className="absolute top-4 right-8 rounded-full bg-grey-20  w-[44px] h-[44px] flex items-center justify-center text-center"
          onPress={closePopover}
          isIconOnly
          variant="solid"
        >
          <CgClose />
        </Button>
        <VersionHistory />
      </PopoverContent>
    </Popover>
  );
}
