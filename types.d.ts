type TEMPAReportSummary = {
  [key: string]: string;
};

type TEMPAReportSummaryCard = {
  title: string;
  description: string;
  summaries: { title: string; summary: Summary[] }[];
};

interface TSubStep {
  id: number;
  title: string;
  markupTitle: string;
  isLocked: boolean;
  data?: string;
  description?: string;
}

interface TStep {
  id: number;
  title: string;
  path?: string;
  data?: string;

  substeps: SubStep[];
  icon: () => JSX.Element;
  isLocked: boolean;
}

interface ProseMirrorNode {
  type: string;
  text?: string;
  attrs?: any;
  content?: ProseMirrorNode[];
  marks?: ProseMirrorMark[];
}

interface ProseMirrorMark {
  type: string;
  text?: string;
}
