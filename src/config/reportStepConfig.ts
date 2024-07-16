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
    title: "overview",
    substeps: [
      { title: "Statement of Work", isLocked: false, data: markdownContent },
      { title: "Executive Summary", isLocked: false, data: markdownContent },
      { title: "EMPA Outcomes", isLocked: false, data: markdownContent },
      { title: "Goals and Aims", isLocked: false, data: markdownContent },
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
    title: "analysis",
    substeps: [
      { title: "Carbon Estimation", isLocked: false, data: markdownContent },
      { title: "EA Opportunities", isLocked: false, data: markdownContent },
      { title: "Project Analysis", isLocked: false, data: markdownContent },
      { title: " Credit Pricing", isLocked: false, data: markdownContent },
    ],
    icon: AnalysisIcon,
  },
  {
    title: "Insights",
    substeps: [
      { title: "Env. Attributes", isLocked: false, data: markdownContent2 },
      { title: "Differentiation", isLocked: false, data: markdownContent2 },
      { title: "Market Trends", isLocked: false, data: markdownContent2 },
      { title: " Pricing Overview", isLocked: false, data: markdownContent2 },
    ],
    icon: InsightIcon,
    isLocked: false,
  },
  {
    isLocked: false,
    title: "regulatory",
    substeps: [
      { title: "Credit Assessment", isLocked: false, data: markdownContent1 },
      { title: "Regulations", isLocked: false, data: markdownContent1 },
      { title: "Market Forecast", isLocked: false, data: markdownContent1 },
      { title: " Assumptions", isLocked: false, data: markdownContent1 },
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
];
