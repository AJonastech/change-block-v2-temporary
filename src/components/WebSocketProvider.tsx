import React, { ReactNode, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
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
  users: User[];
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

function WebSocketProvider({
  currentSegment,
  section,
  endPoint,
  children,
}: {
  currentSegment?: string;
  section?: string;
  endPoint?: string;
  children: (data: Data | null) => ReactNode;
}) {
  const { accessToken } = useAuthStore();
  const socketUrl = `wss://api.cbinternaltools.com/v1/${endPoint}/wss?token=${accessToken}`;
  const { lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    onClose: (event) => {
      console.log("WebSocket closed with code:", event.code);
      console.log("Reason:", event.reason);
    },
  });

  const [webSocketData, setWebSocketData] = useState<any | null>(null);

  useEffect(() => {
    if (lastJsonMessage) {
      const data = (lastJsonMessage as Root).data;
      setWebSocketData(data);
    }
  }, [lastJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // Decode the URL-encoded currentSegment
  // const decodedSegment = decodeURIComponent(currentSegment);

  console.log({ accessToken, connectionStatus, section });

  return <>{children(webSocketData)}</>;
}

export default WebSocketProvider;
