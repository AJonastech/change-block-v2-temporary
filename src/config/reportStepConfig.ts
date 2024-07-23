import {
  AnalysisIcon,
  AssessmentIcon,
  HomeIcon,
  InsightIcon,
  MethodologyIcon,
  OverviewIcon,
  RecommendationIcon,
  RegulatoryIcon,
} from "@/icons";
import {
  markdownContent,
  markdownContent1,
  markdownContent2,
} from "@/mockdata/EMPASectionsMKD";

interface SubStep {
  title: string;
  isLocked: boolean;
  data?: string;
}

interface Step {
  title: string;
  path?: string;

  substeps: SubStep[];
  icon: () => JSX.Element;
  isLocked: boolean;
}

export const EMPAReportSteps: Step[] = [
  {
    title: "home",
    isLocked: false,
    substeps: [],
    icon: HomeIcon,
  },
  {
    isLocked: false,
    title: "Introduction",
    substeps: [
      { title: "Summary of project", isLocked: false, data: markdownContent },
      { title: "Executive Summary", isLocked: false, data: markdownContent },
    ],
    icon: OverviewIcon,
  },
  {
    isLocked: false,
    title: "Objective",
    substeps: [
      { title: "Overview of project", isLocked: false, data: markdownContent },
    ],
    icon: OverviewIcon,
  },

  {
    isLocked: false,
    title: "methodology",
    substeps: [
      { title: "Data Gathering", isLocked: false, data: markdownContent2 },
      { title: "Standards Screening", isLocked: false, data: markdownContent2 },
      { title: "Project Evaluation", isLocked: false, data: markdownContent2 },
    ],
    icon: MethodologyIcon,
  },
  {
    isLocked: false,
    title: "Market analysis",
    substeps: [
      { title: "Market outlook", isLocked: false, data: markdownContent },
      { title: "Overview of Market pricing", isLocked: false, data: markdownContent },
    ],
    icon: AnalysisIcon,
  },
  {
    title: "Key findings",
    substeps: [
      { title: "EA opportunity overview", isLocked: false, data: markdownContent2 },
      { title: "SDG alignment", isLocked: false, data: markdownContent2 },
      { title: "Carbon credit market options", isLocked: false, data: markdownContent2 },
      { title: " Carbon credit pricing analysis", isLocked: false, data: markdownContent2 },
    ],
    icon: InsightIcon,
    isLocked: false,
  },
  {
    isLocked: false,
    title: "regulatory",
    substeps: [
      { title: "Regulatory Environment and Market Mechanisms", isLocked: false, data: markdownContent1 },
    ],
    icon: RegulatoryIcon,
  },
  {
    isLocked: false,
    title: "assessment",
    substeps: [
      { title: "Capital Opportunity", isLocked: false, data: markdownContent },
      { title: "Risk & Opportunities", isLocked: false, data: markdownContent },
      { title: "Sustainability", isLocked: false, data: markdownContent },
    ],
    icon: AssessmentIcon,
  },
  {
    isLocked: false,
    title: "recommendation",
    substeps: [
      { title: "Limitations", isLocked: false, data: markdownContent2 },
      { title: "Action Steps", isLocked: false, data: markdownContent2 },
      { title: "Recommendations", isLocked: false, data: markdownContent2 },
      { title: "Summary", isLocked: false, data: markdownContent2 },
    ],
    icon: RecommendationIcon,
  },
  {
    isLocked: false,
    title: "conclusion",
    substeps: [
      { title: "Limitations", isLocked: false, data: markdownContent2 },
      { title: "Action Steps", isLocked: false, data: markdownContent2 },
      { title: "Recommendations", isLocked: false, data: markdownContent2 },
      { title: "Summary", isLocked: false, data: markdownContent2 },
    ],
    icon: RecommendationIcon,
  },
];
