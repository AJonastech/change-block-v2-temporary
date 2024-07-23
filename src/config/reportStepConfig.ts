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

export interface SubStep {
  id:number;
  title: string;
  isLocked: boolean;
  data?: string;
}

export interface Step {
  id:number;
  title: string;
  path?: string;

  substeps: SubStep[];
  icon: () => JSX.Element;
  isLocked: boolean;
}

export const EMPAReportSteps: Step[] = [
  {
    id: 1,
    title: "home",
    isLocked: false,
    substeps: [],
    icon: HomeIcon,
  },
  {
    id: 2,
    isLocked: false,
    title: "Introduction",
    substeps: [
      { id: 1, title: "Summary of project", isLocked: false, data: markdownContent },
      { id: 2, title: "Executive Summary", isLocked: false, data: markdownContent },
    ],
    icon: OverviewIcon,
  },
  {
    id: 3,
    isLocked: false,
    title: "Objective",
    substeps: [
      { id: 1, title: "Overview of project", isLocked: false, data: markdownContent },
    ],
    icon: OverviewIcon,
  },
  {
    id: 4,
    isLocked: false,
    title: "methodology",
    substeps: [
      { id: 1, title: "Data Gathering", isLocked: false, data: markdownContent2 },
      { id: 2, title: "Standards Screening", isLocked: false, data: markdownContent2 },
      { id: 3, title: "Project Evaluation", isLocked: false, data: markdownContent2 },
    ],
    icon: MethodologyIcon,
  },
  {
    id: 5,
    isLocked: false,
    title: "Market analysis",
    substeps: [
      { id: 1, title: "Market outlook", isLocked: false, data: markdownContent },
      { id: 2, title: "Overview of Market pricing", isLocked: false, data: markdownContent },
    ],
    icon: AnalysisIcon,
  },
  {
    id: 6,
    title: "Key findings",
    substeps: [
      { id: 1, title: "EA opportunity overview", isLocked: false, data: markdownContent2 },
      { id: 2, title: "SDG alignment", isLocked: false, data: markdownContent2 },
      { id: 3, title: "Carbon credit market options", isLocked: false, data: markdownContent2 },
      { id: 4, title: " Carbon credit pricing analysis", isLocked: false, data: markdownContent2 },
    ],
    icon: InsightIcon,
    isLocked: false,
  },
  {
    id: 7,
    isLocked: false,
    title: "regulatory",
    substeps: [
      { id: 1, title: "Regulatory Environment and Market Mechanisms", isLocked: false, data: markdownContent1 },
    ],
    icon: RegulatoryIcon,
  },
  {
    id: 8,
    isLocked: false,
    title: "assessment",
    substeps: [
      { id: 1, title: "Capital Opportunity", isLocked: false, data: markdownContent },
      { id: 2, title: "Risk & Opportunities", isLocked: false, data: markdownContent },
      { id: 3, title: "Sustainability", isLocked: false, data: markdownContent },
    ],
    icon: AssessmentIcon,
  },
  {
    id: 9,
    isLocked: false,
    title: "recommendation",
    substeps: [
      { id: 1, title: "Limitations", isLocked: false, data: markdownContent2 },
      { id: 2, title: "Action Steps", isLocked: false, data: markdownContent2 },
      { id: 3, title: "Recommendations", isLocked: false, data: markdownContent2 },
      { id: 4, title: "Summary", isLocked: false, data: markdownContent2 },
    ],
    icon: RecommendationIcon,
  },
  {
    id: 10,
    isLocked: false,
    title: "conclusion",
    substeps: [
      { id: 1, title: "Limitations", isLocked: false, data: markdownContent2 },
      { id: 2, title: "Action Steps", isLocked: false, data: markdownContent2 },
      { id: 3, title: "Recommendations", isLocked: false, data: markdownContent2 },
      { id: 4, title: "Summary", isLocked: false, data: markdownContent2 },
    ],
    icon: RecommendationIcon,
  },
];
