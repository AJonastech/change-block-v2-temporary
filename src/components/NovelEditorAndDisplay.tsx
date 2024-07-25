"use client";
import { Editor } from "novel";
import { type Editor as TipTapEditor } from "@tiptap/core";
import { useEffect, useState } from "react";
import Markdown from "./Markdown";
import { parseMKD } from "@/config/parseMKD";

type NovelEditorProps = {
  markupContent: string;
  novelJSONContent: any;
  isEditor: boolean;
  className?: string;
};

export default function NovelEditorAndDisplay({
  markupContent,
  novelJSONContent,
  isEditor,
  className,
}: NovelEditorProps) {
  const [htmlContent, setHtmlContent] = useState(parseMKD(markupContent));

  useEffect(() => {
    setHtmlContent(parseMKD(markupContent));
  }, [markupContent]);

  return (
    <div className={`${className} markdown flex-col flex gap-3 h-full`}>
      {isEditor ? (
        <Editor
          defaultValue={{
            type: "doc",
            content: [novelJSONContent as any],
          }}
          onDebouncedUpdate={(editor?: TipTapEditor) => {
            setHtmlContent(editor?.getHTML() as any);
          }}
          disableLocalStorage={true}
          className="!p-0 m-0 shadow-none custom-editor"
        />
      ) : (
        <Markdown className={`${className}`}>{htmlContent}</Markdown>
      )}
    </div>
  );
}
