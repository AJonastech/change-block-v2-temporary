"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { LockIcon, QuestionBoxIcon, UnlockIcon } from "@/icons";
import { useParams, useRouter } from "next/navigation";
import SlideIntoView from "./SlideIntoView";
import { Add } from "iconsax-react";
import useReportStepsStore from "@/store/useReportStepsStore";
import AddClient from "./AddClients";
import { DndProvider, useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const trimSentence = (sentence: string) => {
  if (sentence.length <= 19) return sentence;

  return `${sentence.slice(0, 19)}...`;
};

const ItemTypes = {
  SUBSTEP: 'substep'
};

const DraggableSubStep = ({ stepIndex, subStepIndex, subStep, moveSubStep, setCurrentSubStep, section, step , toggleSubStepLock}: any) => {
  const ref = React.useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.SUBSTEP,
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const dragIndex = item.subStepIndex;
      const hoverIndex = subStepIndex;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveSubStep(dragIndex, hoverIndex);
      item.subStepIndex = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SUBSTEP,
    item: { stepIndex, subStepIndex },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className={`rounded-full group pl-[2rem] flex justify-between relative w-full py-1 gap-2 ${section === subStep.title ? "bg-background" : ""}`}>
      <Link
        href={`/EMPA/${step.title}?data=report&&section=${subStep.title}`}
        className={`w-full hover:text-green-700 capitalize text-nowrap ${section === subStep.title ? "text-primary-100 font-semibold" : "text-dark-100"}`}
        onClick={() =>
          setCurrentSubStep({
            title: subStep.title,
            id: subStep.id,
            isLocked: subStep.isLocked,
            markupTitle: "",
          })
        }
      >
        {trimSentence(subStep.title)}
      </Link>
      <div className={`transition-all duration-300 ${section === subStep.title ? "text-primary-100 font-semibold" : "opacity-0 group-hover:opacity-100"}`}>
        <Button
          isIconOnly
          variant="light"
          className="w-fit h-full text-primary-100"
          onClick={() => {
            toggleSubStepLock(stepIndex, subStepIndex);
          }}
        >
          {subStep.isLocked ? <LockIcon /> : <UnlockIcon />}
        </Button>
      </div>
    </li>
  );
};

const EMPAGeneratorNav = ({
  data,
  section,
}: {
  data: string | null;
  section: string | null;
}) => {
  const router = useRouter();
  const { segment } = useParams();
  const decodedSegment = segment;
  const [openStep, setOpenStep] = useState<number | null>(null);

  const [newSubStepIndex, setNewSubStepIndex] = useState<number | null>(null);
  const [newSubStepTitle, setNewSubStepTitle] = useState<string>("");
  const {
    reportSteps,
    toggleSubStepLock,
    addNewSubStep,
    currentSubStep,
    setCurrentSubStep,
    updateSubSteps,
  } = useReportStepsStore(); // Use Zustand store
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

  const handleNewSubStepBlur = (index: any) => {
    if (newSubStepTitle.trim() !== "") {
      const step = reportSteps.find((reportStep) => reportStep.id === index);
      const subStepExists = step?.substeps?.find(
        (substep) =>
          substep.title.toLowerCase().trim() ===
          newSubStepTitle.toLowerCase().trim()
      );
      if (!subStepExists) {
        console.log({ index, step });
        addNewSubStep(newSubStepIndex!, newSubStepTitle);
        router.push(
          `/EMPA/${step?.title}?data=report&&section=${newSubStepTitle}`
        );
      }
    }

    setNewSubStepIndex(null);
    setNewSubStepTitle("");
  };

  const handleNewSubStepKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: any
  ) => {
    if (e.key === "Enter") {
      handleNewSubStepBlur(index);
    }
  };

 

  const moveSubStep = (dragIndex: number, hoverIndex: number) => {
    const draggedSubStep = reportSteps[openStep!].substeps[dragIndex];
    const newSubSteps = [...reportSteps[openStep!].substeps];
    newSubSteps.splice(dragIndex, 1);
    newSubSteps.splice(hoverIndex, 0, draggedSubStep);

    updateSubSteps(openStep!, newSubSteps);
  };

  console.log({ currentSubStep });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full pb-[2rem] flex flex-col h-full overflow-x-hidden ">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <h6 className="heading-h6 text-grey-500 font-generalSans font-semibold mb-4 pb-3 px-4 mt-7">
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
                    </div>
                  </SlideIntoView>
                ) : (
                  <SlideIntoView from="left" index={index}>
                    <div className="flex items-center w-full group">
                      <Button
                        startContent={
                          <div
                            className={`${
                              segment === step.title
                                ? "opacity-100"
                                : "opacity-70"
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
                    <div className="mx-auto">
                      {newSubStepIndex === index && (
                        <div className="flex items-center gap-2 py-1 ">
                          <input
                            type="text"
                            value={newSubStepTitle}
                            onChange={handleNewSubStepChange}
                            onBlur={() => {
                              handleNewSubStepBlur(step.id);
                            }}
                            onKeyPress={(e) => {
                              handleNewSubStepKeyPress(e, step.id);
                            }}
                            autoFocus
                            className="!border-[0.5px] !border-grey-50 rounded-md px-2 py-1 w-[55%] ml-[2rem] outline-none"
                          />
                        </div>
                      )}
                    </div>
                    {step.substeps.map((subStep, subIndex) => (
                      <DraggableSubStep
                        key={subStep.id}
                        stepIndex={index}
                        subStepIndex={subIndex}
                        subStep={subStep}
                        toggleSubStepLock={toggleSubStepLock}
                        step={step}
                        section={section}
                        setCurrentSubStep={setCurrentSubStep}
                        moveSubStep={moveSubStep}
                      />
                    ))}
                  </motion.ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 px-4 w-full ">
          <Link
            href="/EMPA/question-box?data=report"
            className="flex w-full rounded-full py-2 px-[1rem] hover:bg-gray-300/20 gap-2 mb-4 items-center"
          >
            <QuestionBoxIcon />
            <span className="text-lg font-satoshi leading-[25.2px] font-semibold">
              Question Box
            </span>
          </Link>
          <AddClient />
        </div>
      </div>
</DndProvider>
  );
};

export default EMPAGeneratorNav;
