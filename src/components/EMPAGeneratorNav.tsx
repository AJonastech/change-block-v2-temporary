"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { LockIcon, QuestionBoxIcon, UnlockIcon } from "@/icons";
import { useParams, useRouter } from "next/navigation";
import SlideIntoView from "./SlideIntoView";
import { Add } from "iconsax-react";
import useReportStepsStore from "@/store/useReportStepsStore";

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

  const [newSubStepIndex, setNewSubStepIndex] = useState<number | null>(null);
  const [newSubStepTitle, setNewSubStepTitle] = useState<string>("");
  const { reportSteps, toggleSubStepLock, addNewSubStep, currentSubStep, setCurrentSubStep } = useReportStepsStore(); // Use Zustand store
  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
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
      addNewSubStep(newSubStepIndex!, newSubStepTitle);
      router.push(
        `/EMPA/analysis?data=report&&section=${newSubStepTitle}`
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

  const trimSentence = (sentence: string) => {
    if (sentence.length <= 19) return sentence;

    return `${sentence.slice(0, 19)}...`;
  };


  return (
    <div className="w-full pb-[2rem] flex flex-col h-full overflow-x-hidden ">
   <div className="flex-1 overflow-y-auto no-scrollbar">
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
                    className={`w-full rounded-full flex items-center px-[1rem] py-2 justify-start gap-2 bg-transparent hover text-lg capitalize ${segment === step.title
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
                        className={`${segment === step.title ? "opacity-100 " : "opacity-70"
                          } `}
                      >
                        <step.icon />
                      </div>
                    }
                    className={`w-full rounded-full flex items-center px-[1rem] py-2 justify-start gap-2 bg-transparent hover text-lg capitalize ${segment === step.title
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
                {step.substeps.map(({ title, isLocked, id }, subIndex) => (
                  <SlideIntoView
                    className={`${section === title ? "bg-background" : ""
                      } rounded-full group pl-[2rem] flex justify-between relative w-full py-1 gap-2`}
                    from="right"
                    key={subIndex}

                    index={subIndex}
                  >
                    <Link
                      href={`/EMPA/${step?.title}?data=report&&section=${title}`}
                      className={`${section === title
                          ? "text-primary-100 font-semibold"
                          : "text-dark-100"
                        } w-full hover:text-green-700 capitalize text-nowrap`}


                      onClick={() => setCurrentSubStep({ title, id, isLocked })}

                    >
                      {trimSentence(title)}
                    </Link>
                    <div
                      className={`transition-all duration-300 ${section === title
                          ? "text-primary-100 font-semibold"
                          : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      <Button
                        isIconOnly
                        variant="light"
                        className="w-fit h-full text-primary-100"
                        onClick={() => { toggleSubStepLock(index, subIndex) }}
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
   </div>
    
   
     <div className="mt-4 px-4">
     <Link href="/EMPA/question-box?data=report" className="flex w-full rounded-full py-2 px-[1rem] hover:bg-gray-300/20 gap-2 mb-4 items-center">
        <QuestionBoxIcon/>
      <span className="text-lg font-satoshi leading-[25.2px] font-semibold">Question Box</span>  
      </Link>
      <div className="border-[1px] px-4 py-2 border-[#C1C2C0]/50 rounded-2xl">
        <p className=" text-[15px] text-grey-300 font-satoshi leading-[21px]">Client</p>
        <p className="font-satoshi text-[15px] text-grey-700 font-semibold">GreenLife</p>
      </div>
     </div>
    </div>
  );
};

export default EMPAGeneratorNav;
