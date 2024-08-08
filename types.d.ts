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

interface User {
  full_name: string;
  email: string;
  profile_image: string | null;
  is_verified: boolean;
  user_id: string;
}

interface UserRole {
  user_id: string;
  report_id: string;
  role: string;
  empa_user_id: string;
  user: User;
}

interface Report {
  client_name: string;
  client_industry: string;
  client_project_name: string;
  client_country: string;
  client_files: any[];
  report_stages: any[];
  start_date: string | null;
  total_days_to_complete: number;
  report_details: string;
  report_id: string;
  date_created: string;
  date_updated: string;
  user_role: UserRole;
}

interface ErrorWithResponse extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
      details?: string;
      detail?: string;
    };
  };
}


//new set of types 
interface TSubSection {
  sub_section_name: string;
  sub_section_data: string;
  sub_section_summary: string;
  section_id: string;
  is_locked: boolean;
  generation_status: string;
  sub_section_identifier_in_empa: string;
  sub_section_id: string;
  locker_id: any;
}