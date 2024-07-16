type TEMPAReportSummary = {
  [key: string]: string;
};

type TEMPAReportSummaryCard = {
  title: string;
  description: string;
  summaries: { title: string; summary: Summary[] }[];
};

interface TSubStep {
  title: string;
  isLocked: boolean;
  data?: string;
}


type TStep = {
  title: string;
  path?: string;
  data?: string;
  substeps: SubStep[];
  icon: () => JSX.Element;
  isLocked: boolean;
};
