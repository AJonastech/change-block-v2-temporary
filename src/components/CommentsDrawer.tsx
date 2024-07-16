"use client";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import EMPAComments from "./EMPAComments";

const CommentsDrawer = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const drawerHeight = isOpen ? 584 : 0;

  return (
    <motion.div
      className="transition-height min-w-full w-full"
      initial={{ width: drawerHeight }}
      animate={{ width: drawerHeight }}
    >
      {isOpen && <EMPAComments onClick={onClick} />}
    </motion.div>
  );
};

export default CommentsDrawer;
