"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface SlideIntoViewProps {
  children: React.ReactNode;
  className?: string;
  from?: "left" | "right" | "top" | "bottom";
  index?: number;
}

const SlideIntoView: React.FC<SlideIntoViewProps> = ({
  children,
  className = "",
  from = "bottom",
  index = 0,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (inView && !hasBeenInView) {
      controls.start("visible");
      setHasBeenInView(true);
    }
  }, [controls, inView, hasBeenInView]);

  const variants = {
    hidden: {
      opacity: 0,
      x: from === "left" ? -100 : from === "right" ? 100 : 0,
      y: from === "top" ? -100 : from === "bottom" ? 100 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }, // Adjust the delay multiplier as needed
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideIntoView;
