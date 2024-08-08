"use client";
import React, { useCallback, useEffect, useState } from "react";
import EMPAReportHome from "./EMPAReportHome";
import EMPAReportSegment from "./EMPAReportSegment";
import useReportStepsStore from "@/store/useReportStepsStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useFetchData } from "@/hooks/useFetchData";
import { getEmpaReport } from "@/actions/EmpaActions";

interface Root {
  percentage_completed: number;
  data: Data;
}

interface Data {
  client_name: string;
  client_industry: string;
  client_project_name: string;
  client_country: string;
  client_files: any[];
  report_stages: any[];
  start_date: any;
  total_days_to_complete: number;
  report_details: string;
  generation_status: string;
  report_id: string;
  date_created: string;
  date_updated: string;
  sections: Section[];
  users: User[];
  invitations: any[];
  user_role: UserRole;
}

interface Section {
  section_name: string;
  section_data: string;
  stage: string;
  relative_start_date_in_days: number;
  days_to_complete: number;
  section_id: string;
  sub_sections: TSubSection[];
}

interface User {
  user_id: string;
  report_id: string;
  role: string;
  empa_user_id: string;
  user: User2;
}

interface User2 {
  full_name: string;
  email: string;
  profile_image: any;
  is_verified: boolean;
  user_id: string;
}

interface UserRole {
  user_id: string;
  report_id: string;
  role: string;
  empa_user_id: string;
  user: User3;
}

interface User3 {
  full_name: string;
  email: string;
  profile_image: any;
  is_verified: boolean;
  user_id: string;
}

function EmpaHttpWrapper({
  generatedId,
  currentSegment,
  section,
}: {
  generatedId: string;
  currentSegment: string;
  section: string;
}) {
  const { accessToken } = useAuthStore();
  const setReportSteps = useReportStepsStore((state) => state.setReportSteps);
  const {
    data: report,
    isLoading,
    error,
  } = useFetchData([`empa-reports/${generatedId}`], () =>
    getEmpaReport(generatedId)
  );

  const typedReport = report as Report;

  console.log({ report: JSON.stringify(report) });

  useEffect(() => {
    const fetchData = async () => {
      if (typedReport) {
        const transformedSteps = typedReport?.sections?.map((section) => ({
          id: parseInt(section.section_id),
          title: section.section_name,
          isLocked: false, // or however you determine this
          substeps: section.sub_sections.map((subSection) => ({
            id: parseInt(subSection.section_id),
            title: `${subSection.sub_section_name}`,
            isLocked: false, // or however you determine this
            data: subSection.sub_section_data, // Fix the property name here
            description: "",
            markupTitle: `#### ${subSection.sub_section_name}`,
          })),
          icon: () => <></>, // Add the icon property here
        }));
        console.log({ transformedSteps });
        setReportSteps(transformedSteps);
      }
    };

    fetchData();
  }, [
    generatedId,
    accessToken,
    setReportSteps,
    report,
    typedReport?.sections,
    typedReport,
  ]);

  const getSubSection = useCallback(
    (
      data: Data,
      sectionName: string,
      subSectionName: string
    ): TSubSection | undefined => {
      const section = data.sections.find(
        (sec) => sec.section_name === sectionName
      );
      if (!section) {
        return undefined;
      }
      return section.sub_sections.find(
        (sub) => sub.sub_section_name === subSectionName
      );
    },
    []
  );
  const decodedSegment = decodeURIComponent(currentSegment);
  const subSectionData = report
    ? getSubSection(report, decodedSegment, section)
    : undefined;

  return (
    <>
      {decodedSegment === "home" ? (
        <EMPAReportHome id={generatedId} />
      ) : (
        <EMPAReportSegment
          data={subSectionData as TSubSection}
          section={section}
          id={generatedId}
        />
      )}
    </>
  );
}

export default EmpaHttpWrapper;
