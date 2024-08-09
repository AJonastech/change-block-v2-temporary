"use client";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import EMPAComments from "./EMPAComments";
import WebSocketProvider from "./WebSocketProvider";

const CommentsDrawer = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const drawerHeight = isOpen ? 584 : 0;
  const empa_report_id = "";
  const subsection_id = "";
  return (
    <motion.div
      className="transition-height min-w-full w-full"
      initial={{ width: drawerHeight }}
      animate={{ width: drawerHeight }}
    >
      {isOpen && (
        <WebSocketProvider
          endPoint={`empa-reports/${empa_report_id}/sub-section/${subsection_id}/comments`}
        >
          {(data) => {
            return <EMPAComments onClick={onClick} data={data} />;
          }}
        </WebSocketProvider>
      )}
    </motion.div>
  );
};

export default CommentsDrawer;
