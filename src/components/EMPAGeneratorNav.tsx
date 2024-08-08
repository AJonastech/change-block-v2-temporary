"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Skeleton, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { LockIcon, QuestionBoxIcon, UnlockIcon } from "@/icons";
import { useParams, usePathname, useRouter } from "next/navigation";
import SlideIntoView from "./SlideIntoView";
import { Add } from "iconsax-react";
import useReportStepsStore from "@/store/useReportStepsStore";
import AddClient from "./AddClients";
import {
  DndProvider,
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { trimSentence } from "@/lib/utils";
import { useLocation } from "react-use";

const ItemTypes = {
  SUBSTEP: "substep",
};

const DraggableSubStep = ({
  stepIndex,
  subStepIndex,
  subStep,
  moveSubStep,
  setCurrentSubStep,
  section,
  step,
  id,
  toggleSubStepLock,
}: any) => {
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  const ref = useRef<HTMLLIElement>(null);
  const [initialY, setInitialY] = useState<number | null>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.SUBSTEP,
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const dragIndex = item.subStepIndex;
      const hoverIndex = subStepIndex;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
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
    end: () => setInitialY(null),
  });

  const handleDrag = useCallback(
    (event: DragEvent) => {
      if (initialY !== null) {
        const currentY = event.clientY;
        const deltaY = currentY - initialY;

        if (deltaY > 50 || deltaY < -50) {
          event.preventDefault();
        }
      }
    },
    [initialY]
  );

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("drag", handleDrag);
      return () => {
        element.removeEventListener("drag", handleDrag);
      };
    }
  }, [handleDrag, initialY]);

  drag(drop(ref));

  return (
    <li
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className={`rounded-full ${
        isDragging && "scale-105 rounded-full"
      } group pl-[2rem] flex items-center justify-between relative w-full py-1 gap-2 ${
        section === subStep.title ? "bg-background" : ""
      }`}
      onMouseDown={() => {
        const initialRect = ref.current?.getBoundingClientRect();
        if (initialRect) {
          setInitialY(initialRect.top + window.scrollY);
        }
      }}
    >
      {subStep.generation_status === "GENERATING" && <Spinner size="sm" />}
      <Link
        href={`/EMPA/${step.title}?data=report&&id=${id}&&section=${subStep.title}&&status=${status}`}
        className={`w-full hover:text-green-700 capitalize text-nowrap ${
          section === subStep.title
            ? "text-primary-100 font-semibold"
            : "text-dark-100"
        }`}
        onClick={() =>
          setCurrentSubStep({
            title: subStep.title,
            id: subStep.id,
            isLocked: subStep.isLocked,
            markupTitle: "",
          })
        }
      >
        {trimSentence(subStep.title, 17)}
      </Link>
      <div
        className={`transition-all duration-300 ${
          section === subStep.title
            ? "text-primary-100 font-semibold"
            : "opacity-0 group-hover:opacity-100"
        }`}
      >
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
  id,
  section,
}: {
  data: string | null;
  id: string;
  section: string | null;
}) => {
  const router = useRouter();
  const { segment } = useParams();

  const decodedSegment = decodeURIComponent(segment as string);
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
          `/EMPA/${step?.title}?data=report&&id=${id}&&section=${newSubStepTitle}`
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

  const skeleton = Array.from({ length: 13 });

  console.log({ reportSteps });
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full pb-[2rem] flex flex-col h-full overflow-x-hidden ">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <h6 className="heading-h6 text-grey-500 font-generalSans font-semibold mb-4 pb-3 px-4 mt-7">
            Report Steps
          </h6>
          <ul className="h-full gap-2 flex flex-col pl-3 pr-1 not-prose">
            {reportSteps.length === 0 &&
              skeleton.map((sk, index) => {
                return (
                  <>
                    <SlideIntoView from="left" index={index}>
                      <Skeleton className="w-[90%] h-6 rounded-md py-5 mb-1" />
                    </SlideIntoView>
                  </>
                );
              })}
            {reportSteps.map((step, index) => (
              <li key={index} className=" ">
                <SlideIntoView from="left" index={index}>
                  <div className="flex cursor-pointer items-center w-full group">
                    <Button
                      startContent={
                        <div
                          className={`${
                            decodedSegment === step.title
                              ? "opacity-100"
                              : "opacity-70"
                          } `}
                        >
                          <step.icon />
                        </div>
                      }
                      className={`w-full rounded-full flex items-center px-[1rem] py-2 justify-start gap-2 bg-transparent hover text-lg capitalize ${
                        decodedSegment === step.title
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
                        id={id}
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
            href={`/EMPA/question-box?data=report&&id=${id}`}
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
