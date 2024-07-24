"use client";

import { parseMKD } from "@/config/parseMKD";
import { ReactNode } from "react";

interface MarkdownProps {
  children: ReactNode;
  className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ children, className }) => {
  const parsedContent = parseMKD(children as string);

  return (
    <div
      className={`${className} markdown min-h-max h-full`}
      dangerouslySetInnerHTML={{ __html: children as string }}
    ></div>
  );
};

export default Markdown;
