type TEMPAReportSummary = {
  [key: string]: string;
};

type TEMPAReportSummaryCard = {
  title: string;
  description: string;
  summaries: { title: string; summary: Summary[] }[];
};

interface TSubstep {
  title: string;
  locked: boolean;
}

interface TStep {
  title: string;
  path?: string;
  substeps: Substep[];
  icon: ReactElement;
}
