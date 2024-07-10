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


interface SubStep {
    title: string;
    isLocked: boolean;
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
            { title: "Statement of Work", isLocked: false },
            { title: "Executive Summary", isLocked: false },
            { title: "EMPA Outcomes", isLocked: false },
            { title: "Goals and Aims", isLocked: false },
        ],
        icon: OverviewIcon,
    },

    {
        isLocked: false,
        title: "methodology",
        substeps: [
            { title: "Data Gathering", isLocked: false },
            { title: "Standards Screening", isLocked: false },
            { title: "Project Evaluation", isLocked: false },
        ],
        icon: MethodologyIcon,
    },
    {
        isLocked: false,
        title: "analysis",
        substeps: [{ title: "Substep 1", isLocked: false }],
        icon: AnalysisIcon,
    },
    { title: "Insights", substeps: [], icon: InsightIcon, isLocked: false },
    {
        isLocked: false,
        title: "regulatory",
        substeps: [
            { title: "Substep 1", isLocked: false },
            { title: "Substep 2", isLocked: false },
        ],
        icon: RegulatoryIcon,
    },
    {
        isLocked: false,
        title: "assessment",
        substeps: [
            { title: "Substep 1", isLocked: false },
            { title: "Substep 2", isLocked: false },
            { title: "Substep 3", isLocked: false },
        ],
        icon: AssessmentIcon
    },
    {
        isLocked: false,
        title: "recommendation",
        substeps: [
            { title: "Substep 1", isLocked: false },
            { title: "Substep 2", isLocked: false },
            { title: "Substep 3", isLocked: false },
        ],
        icon: RecommendationIcon
    },
];