"use client";

import { Editor } from "novel";
import { type Editor as TipTapEditor } from "@tiptap/core";
import { useState } from "react";
import Markdown from "./Markdown";
import { parseMKD } from "@/config/parseMKD";
import { markdownContent2 } from "@/mockdata/EMPASectionsMKD";

type NovelEditorProps = {
  markupContent: string;
  novelJSONContent:any;
  isEditor: boolean;
};

export default function NovelEditorAndDisplay({ markupContent,novelJSONContent, isEditor }: NovelEditorProps) {
  const [htmlContent, setHtmlContent] = useState(parseMKD(markupContent));

  return (
    <div className="markdown flex-col flex gap-3">
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
          className=" !p-0 m-0 shadow-none custom-editor"
        />
      ) : (
        <Markdown>{htmlContent}</Markdown>
      )}
    </div>
  );
}
