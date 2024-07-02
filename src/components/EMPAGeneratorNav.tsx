"use client";

import { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
  AnalysisIcon,
  AssessmentIcon,
  HomeIcon,
  InsightIcon,
  LockIcon,
  MethodologyIcon,
  OverviewIcon,
  RecommendationIcon,
  RegulatoryIcon,
  UnlockIcon,
} from "@/icons";
import { useParams, useSearchParams } from "next/navigation";
import SlideIntoView from "./SlideIntoView";

interface SubStep {
  title: string;
  isLocked: boolean;
}

interface Step {
  title: string;
  path?: string;
  substeps: SubStep[];
  icon: ReactElement;
  isLocked: boolean;
}

export const EMPAReportSteps: Step[] = [
  {
    title: "home",
    isLocked: false,
    substeps: [],
    icon: <HomeIcon />,
  },
  {
    isLocked: false,
    title: "overview",
    substeps: [
      { title: "Statement of Work", isLocked: false },
      { title: "Executive Summary", isLocked: false },
      { title: "EMPA Outcomes", isLocked: false },
      { title: "Goals and Aims", isLocked: false },
    ],
    icon: <OverviewIcon />,
  },

  {
    isLocked: false,
    title: "methodology",
    substeps: [
      { title: "Data Gathering", isLocked: false },
      { title: "Standards Screening", isLocked: false },
      { title: "Project Evaluation", isLocked: false },
    ],
    icon: <MethodologyIcon />,
  },
  {
    isLocked: false,
    title: "analysis",
    substeps: [{ title: "Substep 1", isLocked: false }],
    icon: <AnalysisIcon />,
  },
  { title: "Insights", substeps: [], icon: <InsightIcon />, isLocked: false },
  {
    isLocked: false,
    title: "regulatory",
    substeps: [
      { title: "Substep 1", isLocked: false },
      { title: "Substep 2", isLocked: false },
    ],
    icon: <RegulatoryIcon />,
  },
  {
    isLocked: false,
    title: "assessment",
    substeps: [
      { title: "Substep 1", isLocked: false },
      { title: "Substep 2", isLocked: false },
      { title: "Substep 3", isLocked: false },
    ],
    icon: <AssessmentIcon />,
  },
  {
    isLocked: false,
    title: "recommendation",
    substeps: [
      { title: "Substep 1", isLocked: false },
      { title: "Substep 2", isLocked: false },
      { title: "Substep 3", isLocked: false },
    ],
    icon: <RecommendationIcon />,
  },
];

const EMPAGeneratorNav = ({
  data,
  section,
}: {
  data: string | null;
  section: string | null;
}) => {
  const { segment } = useParams();
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [reportSteps, setReportSteps] = useState(EMPAReportSteps);

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

  return (
    <div className="w-full pb-[2rem] flex flex-col h-full overflow-x-hidden ">
      <h3 className="  mb-4 pb-3 px-4 ">Report Steps</h3>
      <ul className="h-full flex flex-col px-3 not-prose">
        {reportSteps.map((step, index) => (
          <li key={index} className="mb-2 ">
            {step.substeps.length <= 0 ? (
              <SlideIntoView from="left" index={index}>
                <Link
                  href={`/EMPA-generator/${step.title}?data=report`}
                  className={`w-full  rounded-full  flex items-center px-[1rem] py-2 justify-start gap-2 bg-transparent hover text-base capitalize ${
                    segment === step.title
                      ? "text-dark-300  font-semibold"
                      : "text-dark-200"
                  } hover:bg-gray-300/20`}
                  onClick={() => toggleStep(index)}
                >
                  <span className=" "> {step.icon}</span>
                  <span className="pl-2"> {step.title}</span>
                </Link>
              </SlideIntoView>
            ) : (
              <SlideIntoView from="left" index={index}>
                <Button
                  startContent={step.icon}
                  className={`w-full rounded-full justify-start bg-transparent hover text-base capitalize ${
                    segment === step.title
                      ? "text-dark-300  font-semibold"
                      : "text-dark-200"
                  } hover:bg-gray-300/20`}
                  onClick={() => toggleStep(index)}
                >
                  <span className="pl-2"> {step.title}</span>
                </Button>
              </SlideIntoView>
            )}
            {openStep === index && (
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden flex flex-col items-end px-[1rem]  "
              >
                {step.substeps.map(({ title, isLocked }, subIndex) => (
                  <SlideIntoView
                    className={` ${
                      section === title ? "bg-background" : " "
                    }  rounded-full group pl-[3rem]  flex justify-between relative w-full py-1 gap-2`}
                    from="right"
                    key={subIndex}
                    index={subIndex}
                  >
                    <Link
                      href={`/EMPA-generator/${step?.title}?data=report&&section=${title}`}
                      className={` ${
                        section === title
                          ? "text-primary-100 font-semibold"
                          : "text-dark-100 "
                      } w  w-full   hover:text-green-700 capitalize text-nowrap`}
                    >
                      {title}
                    </Link>
                    <div
                      className={` ${
                        section === title
                          ? "text-primary-100 font-semibold"
                          : "hidden group-hover:block "
                      } `}
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
