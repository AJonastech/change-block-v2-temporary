"use client";

import { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { LockIcon, UnlockIcon } from "@/icons";
import { useParams, useRouter } from "next/navigation";
import SlideIntoView from "./SlideIntoView";
import { EMPAReportSteps } from "@/config/reportStepConfig";
import { Add } from "iconsax-react";

const EMPAGeneratorNav = ({
  data,
  section,
}: {
  data: string | null;
  section: string | null;
}) => {
  const router = useRouter();
  const { segment } = useParams();
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [reportSteps, setReportSteps] = useState(EMPAReportSteps);
  const [newSubStepIndex, setNewSubStepIndex] = useState<number | null>(null);
  const [newSubStepTitle, setNewSubStepTitle] = useState<string>("");

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  const toggleSubStepLock = (stepIndex: number, subIndex: number) => {
    setReportSteps((prevSteps) =>
      prevSteps.map((step, sIdx) =>
        sIdx === stepIndex
          ? {
              ...step,
              substeps: step.substeps.map((substep, ssIdx) =>
                ssIdx === subIndex
                  ? { ...substep, isLocked: !substep.isLocked }
                  : substep
              ),
            }
          : step
      )
    );
  };

  const handleAddNewSubStep = (stepIndex: number) => {
    setNewSubStepIndex(stepIndex);
    setNewSubStepTitle("");
  };

  const handleNewSubStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubStepTitle(e.target.value);
  };

  const handleNewSubStepBlur = () => {
    if (newSubStepTitle.trim() !== "") {
      setReportSteps((prevSteps) =>
        prevSteps.map((step, sIdx) =>
          sIdx === newSubStepIndex
            ? {
                ...step,
                substeps: [
                  ...step.substeps,
                  { title: newSubStepTitle, isLocked: false },
                ],
              }
            : step
        )
      );
      router.push(
        `http://localhost:3000/EMPA/analysis?data=report&&section=${newSubStepTitle}`
      );
    }

    setNewSubStepIndex(null);
    setNewSubStepTitle("");
  };

  const handleNewSubStepKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleNewSubStepBlur();
    }
  };

  return (
    <div className="w-full pb-[2rem] flex flex-col h-full overflow-x-hidden ">
      <h6 className=" heading-h6 text-grey-500 font-generalSans font-semibold mb-4 pb-3 px-4 mt-7 ">
        Report Steps
      </h6>
      <ul className="h-full flex flex-col pl-3 pr-1 not-prose">
        {reportSteps.map((step, index) => (
          <li key={index} className="mb-2 ">
            {step.substeps.length <= 0 ? (
              <SlideIntoView from="left" index={index}>
                <div className="flex items-center w-full group">
                  <Link
                    href={`/EMPA/${step.title}?data=report`}
                    className={`w-full rounded-full flex items-center px-[1rem] py-2 justify-start gap-2 bg-transparent hover text-lg capitalize ${
                      segment === step.title
                        ? "text-grey-700 font-satoshi font-medium"
                        : "text-grey-300 font-light"
                    } hover:bg-gray-300/20`}
                    onClick={() => toggleStep(index)}
                  >
                    <span>{<step.icon />}</span>
                    <span className="pl-2">{step.title}</span>
                  </Link>
                  {/* <Button
                    isIconOnly
                    variant="light"
                    className="ml-2 opacity-0 group-hover:opacity-100"
                    onClick={() => {
                      openStep !== index && toggleStep(index);
                      handleAddNewSubStep(index);
                    }}
                  >
                    <Add />
                  </Button> */}
                </div>
              </SlideIntoView>
            ) : (
              <SlideIntoView from="left" index={index}>
                <div className="flex items-center w-full group">
                  <Button
                    startContent={
                      <div
                        className={`${
                          segment === step.title ? "opacity-100 " : "opacity-70"
                        } `}
                      >
                        <step.icon />
                      </div>
                    }
                    className={`w-full rounded-full flex items-center px-[1rem] py-2 justify-start gap-2 bg-transparent hover text-lg capitalize ${
                      segment === step.title
                        ? "text-grey-700 font-satoshi font-medium"
                        : "text-grey-300 font-light"
                    } hover:bg-gray-300/20`}
                    onClick={() => toggleStep(index)}
                  >
                    <span className="pl-2">{step.title}</span>
                  </Button>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="light"
                    className="ml-2 opacity-0 group-hover:opacity-100 text-grey-700 "
                    onClick={() => {
                      openStep !== index && toggleStep(index);
                      handleAddNewSubStep(index);
                    }}
                  >
                    <Add size={18} />
                  </Button>
                </div>
              </SlideIntoView>
            )}
            {openStep === index && (
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden flex flex-col items-end px-[1.2rem] w-full justify-between"
              >
                <div className=" mx-auto">
                  {newSubStepIndex === index && (
                    <div className=" flex items-center gap-2 py-1 ">
                      <input
                        type="text"
                        value={newSubStepTitle}
                        onChange={handleNewSubStepChange}
                        onBlur={handleNewSubStepBlur}
                        onKeyPress={handleNewSubStepKeyPress}
                        autoFocus
                        className="!border-[0.5px] !border-grey-50 rounded-md px-2 py-1 w-[55%] ml-[2rem] outline-none"
                      />
                    </div>
                  )}
                </div>
                {step.substeps.map(({ title, isLocked }, subIndex) => (
                  <SlideIntoView
                    className={`${
                      section === title ? "bg-background" : ""
                    } rounded-full group pl-[2rem] flex justify-between relative w-full py-1 gap-2`}
                    from="right"
                    key={subIndex}
                    index={subIndex}
                  >
                    <Link
                      href={`/EMPA/${step?.title}?data=report&&section=${title}`}
                      className={`${
                        section === title
                          ? "text-primary-100 font-semibold"
                          : "text-dark-100"
                      } w-full hover:text-green-700 capitalize text-nowrap`}
                    >
                      {title}
                    </Link>
                    <div
                      className={`transition-all duration-300 ${
                        section === title
                          ? "text-primary-100 font-semibold"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <Button
                        isIconOnly
                        variant="light"
                        className="w-fit h-full text-primary-100"
                        onClick={() => toggleSubStepLock(index, subIndex)}
                      >
                        {isLocked ? <LockIcon /> : <UnlockIcon />}
                      </Button>
                    </div>
                  </SlideIntoView>
                ))}
              </motion.ul>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 px-6">
        <h3 className="text-xl font-semibold">Client</h3>
        <p>GreenLife</p>
      </div>
    </div>
  );
};

export default EMPAGeneratorNav;
