"use client";

import React from "react";
import EMPAReportCards from "./EMPAReportSummaryCard";
import { EMPAReportSteps } from "@/config/reportStepConfig";
import EMPAReportProjectTimeline from "./EMPAReportProjectTimeLine";
import useIsMounted from "@/hooks/useIsMounted";
import { Skeleton } from "@nextui-org/react";

const EMPAReportHome = () => {
  const isMounted = useIsMounted();

  return (
    <div className="flex flex-col relative h-full max-h-fit gap-6">
      <div className=" !max-w-full">
        <EMPAReportProjectTimeline
          stages={stages}
          weeks={8}
          startDate="2023-06-01"
        />
      </div>

      {EMPAReportSteps.slice(1).map((steps, id) => {
        return (
          <section
            key={id}
            className="flex flex-col gap-6 text-dark-300  pb-[2.5rem]"
          >
            <Skeleton isLoaded={isMounted} className="max-w-[40%] rounded-lg">
              {" "}
              <h4 className="heading-h4 font-generalSans font-semibold leading-[40.3px] text-grey-700 capitalize w-fit !my-0">
            {steps.title}
          </h4>
            </Skeleton>
            <EMPAReportCards cards={cards} />
          </section>
        );
      })}
    </div>
  );
};

export default EMPAReportHome;

const cards = [
  {
    title: "Introduction and client summary",
    description:
      "Explore the valuable insights and outcomes generated through our EMPA analysis, highlighting potential environmental assets and their strategic implications for GreenLife NGO's mission.",
    summaries: [
      {
        title: "Key Findings",
        summary: [
          "The EMPA shows significant opportunities in renewable energy.",
          "Data indicates a potential for 20% reduction in emissions.",
        ],
      },
      {
        title: "Strategic Implications",
        summary: [
          "The EMPA outcomes underscore the need for strategic investment in clean technologies.",
          "Recommendations for policy changes to support sustainable practices.",
        ],
      },
    ],
  },
  {
    title: "EMPA Outcomes",
    description: "Different insights and outcomes from another EMPA analysis.",
    summaries: [
      {
        title: "Key Discoveries",
        summary: [
          "Significant potential in green building initiatives.",
          "Opportunities for reducing energy consumption by 30%.",
        ],
      },
      {
        title: "Strategic Actions",
        summary: [
          "Investing in energy-efficient technologies is crucial.",
          "Support for regulatory measures promoting sustainability.",
        ],
      },
    ],
  },
  {
    title: "Goals and Aims",
    description: "Different insights and outcomes from another EMPA analysis.",
    summaries: [
      {
        title: "EMPA Objectives",
        summary: [
          "- Significant potential in green building initiatives.",
          "- Opportunities for reducing energy consumption by 30%.",
        ],
      },
      {
        title: "Strategic Actions",
        summary: [
          "- Investing in energy-efficient technologies is crucial.",
          "Support for regulatory measures promoting sustainability.",
        ],
      },
    ],
  },
];
const stages = [
  {
    name: "Stage 1",
    activities: [
      {
        name: "Overview",
        week: 1,
        description: "Understand GreenLife's objectives and scope",
        duration: 3,
      },
      {
        name: "Methodology",
        week: 2,
        description: "Collect relevant project data",
        duration: 2,
      },
    ],
  },
  {
    name: "Stage 2",
    activities: [
      {
        name: "Analysis",
        week: 4,
        duration: 2,
        description: "Review technical, and environmental aspects",
      },

      {
        name: "Insights",
        week: 5,
        duration: 2,
        description: "Identify unique selling propositions",
      },

      {
        name: "Regulations",
        week: 6,
        duration: 2,
        description: "Outline relevant regulations impacting the market",
      },
    ],
  },
  {
    name: "Stage 3",
    activities: [
      {
        name: "Assessment",
        week: 4,
        duration: 2,
        description: "Assess risks and opportunities with strategies",
      },

      {
        name: "Recommendation",
        week: 5,
        duration: 2,
        description: "Provide actionable recommendations",
      },
    ],
  },
];
