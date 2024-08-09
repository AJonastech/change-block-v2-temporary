import { Editor } from "novel";
import { type Editor as TipTapEditor } from "@tiptap/core";
import { useEffect, useState } from "react";
import Markdown from "./Markdown";
import { parseMKD } from "@/config/parseMKD";
import { editEmpaReport } from "@/actions/EmpaActions";
import usePost from "@/hooks/usePostData";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { parseHTMLToMKD } from "@/config/parseHTMLToMKD";

import { MarkdownSerializer } from "prosemirror-markdown";
import { Node as ProseMirrorNode } from "prosemirror-model";

// Extend the defaultMarkdownSerializer with custom node serializers
const customMarkdownSerializer = new MarkdownSerializer(
  {
    ...defaultMarkdownSerializer.nodes, // Copy existing nodes
    orderedList(state, node) {
      state.renderList(node, "   ", (index) => `${index + 1}. `);
    },
    bulletList(state, node) {
      state.renderList(node, "   ", () => "- ");
    },
    listItem(state, node) {
      state.renderContent(node);
    },
    // Add more custom nodes if necessary
  },
  defaultMarkdownSerializer.marks // Copy existing marks
);

export const serializeToMarkdown = (editor: TipTapEditor) => {
  return customMarkdownSerializer.serialize(editor.state.doc);
};

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
  subSectionId,
}: NovelEditorProps) {
  const [htmlContent, setHtmlContent] = useState(parseMKD(markupContent));
  const [markdownContent, setMarkdownContent] = useState(markupContent);

  useEffect(() => {
    setHtmlContent(parseMKD(markupContent));
  }, [markupContent]);

  const handleSuccess = () => {};

  const { mutate: updateReport } = usePost({
    handleSuccess,
    mutateFn: async (data: { sub_section_data: string }) => {
      await editEmpaReport(reportId, sectionId, subSectionId, data);
    },
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
            if (editor) {
              const markdownContent = editor.getText();
              setMarkdownContent(markdownContent);
              setHtmlContent(editor.getHTML() as string);
              console.log({ markdownContent, htmlContent });

              // Send the markdown content to the server
              updateReport({
                sub_section_data: markdownContent,
              });
            }
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
