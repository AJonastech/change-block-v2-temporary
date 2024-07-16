"use client";

import { parseMKD } from "@/config/parseMKD";

interface MarkdownProps {
  children: string;
}

const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  const parsedContent = parseMKD(children);

  return (
    <div
      className="markdown min-h-full h-full
                "
      dangerouslySetInnerHTML={{ __html: parsedContent }}
    ></div>
  );
};

export default Markdown;
