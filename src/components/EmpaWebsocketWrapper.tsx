"use client";
import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import EMPAReportHome from "./EMPAReportHome";
import EMPAReportSegment from "./EMPAReportSegment";
import useReportStepsStore from "@/store/useReportStepsStore";
import { useAuthStore } from "@/store/useAuthStore";

// Define your types
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
    users: ReportUser[];
    invitations: any[];
    user_role: UserRole;
}

interface Section {
    section_name: string;
    section_data: string;
    position: number;
    stage: string;
    relative_start_date_in_days: number;
    days_to_complete: number;
    section_id: string;
    sub_sections: TSubSection[];
}

interface User {
    user_id: string;
    full_name: string;
    email: string;
    profile_image: string;
    is_verified: boolean;
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

function EmpaWebsocketWrapper({
    generatedId,
    currentSegment,
    section,
}: {
    generatedId: string;
    currentSegment: string;
    section: string;
}) {
    const { accessToken } = useAuthStore();
    const socketUrl = `wss://api.cbinternaltools.com/v1/empa-reports/${generatedId}/wss?token=${accessToken}`;
    const { sendMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
        onClose: (event) => {
            console.log("WebSocket closed with code:", event.code);
            console.log("Reason:", event.reason);
        }
    });

    const {setReportSteps,setUsers} = useReportStepsStore()

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];


    useEffect(() => {
        if (lastJsonMessage) {
            const data = (lastJsonMessage as Root).data;

            // Sort the sections based on the `position` field before mapping
            const sortedSections = data.sections.sort((a, b) => a.position - b.position);

            // Transform the incoming data into the format your Zustand store expects
            const transformedSteps: TStep[] = sortedSections.map((section) => ({
                id: parseInt(section.section_id),
                title: section.section_name,
                isLocked: false, // or however you determine this
                substeps: section.sub_sections.sort((a, b) => a.position - b.position).map((subSection) => ({
                    id: parseInt(subSection.sub_section_id),
                    title: subSection.sub_section_name,
                    isLocked: subSection.is_locked,
                    data: subSection.sub_section_data, // Fixed the property name here
                    description: subSection.sub_section_summary, // Use the summary if you want
                    markupTitle: subSection.sub_section_name,
                })),
                icon: () => <></>, // Add the icon property here
            }));
            setUsers(data.users);
            setReportSteps(transformedSteps);
        }
    }, [lastJsonMessage, setReportSteps]);


    const getSubSection = (
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
    };

    // Decode the URL-encoded currentSegment
    const decodedSegment = decodeURIComponent(currentSegment);
    console.log(decodedSegment);

    // Extract subsection data if available
    const subSectionData = lastJsonMessage
        ? getSubSection((lastJsonMessage as Root).data, decodedSegment, section)
        : undefined;

    console.log({ subSectionData, accessToken, connectionStatus });
    console.log({ connectionStatus });

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

export default EmpaWebsocketWrapper;
