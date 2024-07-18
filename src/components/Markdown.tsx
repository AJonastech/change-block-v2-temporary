"use client";

import { parseMKD } from "@/config/parseMKD";
import { ReactNode } from "react";

interface MarkdownProps {
  children: ReactNode;
}

const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  const parsedContent = parseMKD(children as string);

  return (
    <div
      className="markdown min-h-full h-full
                "
      dangerouslySetInnerHTML={{ __html: children as string }}
    ></div>
  );
};

export default Markdown;
