"use client";
import { Editor } from "novel";
import { type Editor as TipTapEditor } from "@tiptap/core";
import { useEffect, useState } from "react";
import Markdown from "./Markdown";
import { parseMKD } from "@/config/parseMKD";
import { editEmpaReport } from "@/actions/EmpaActions";
import usePost from "@/hooks/usePostData";

type NovelEditorProps = {
  markupContent: string;
  novelJSONContent: any;
  isEditor: boolean;
  className?: string;
  reportId: string;
  sectionId: string;
  subSectionId: string;
};

export default function NovelEditorAndDisplay({
  markupContent,
  novelJSONContent,
  isEditor,
  reportId,
  sectionId,
  className,
  subSectionId
}: NovelEditorProps) {
  const [htmlContent, setHtmlContent] = useState(parseMKD(markupContent));

  useEffect(() => {
    setHtmlContent(parseMKD(markupContent));
  }, [markupContent]);

  const handleSuccess = () => {

  }

  const { mutate: updateReport } = usePost({
    handleSuccess,
    mutateFn: async (data: {
      sub_section_data: string;
    }) => {
      await editEmpaReport(reportId, sectionId, subSectionId, data)
    }
  });
  return (
    <div className={`${className} markdown flex-col flex gap-3 h-full`}>
      {isEditor ? (
        <Editor
          defaultValue={{
            type: "doc",
            content: [novelJSONContent as any],
          }}
          onDebouncedUpdate={(editor?: TipTapEditor) => {
            const markdownContent = editor?.getText();
            setHtmlContent(editor?.getHTML() as any);
            // Send the markdown content to the server
            updateReport({
              sub_section_data: markdownContent || '',
            });
          }}
          disableLocalStorage={true}
          className="!p-0 m-0 shadow-none custom-editor"
        />
      ) : (
        <Markdown className={`${className} mb-[3rem] pb-[3rem] `}>
          {htmlContent}
        </Markdown>
      )}
    </div>
  );
}
