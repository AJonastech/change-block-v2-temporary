import { Editor } from "novel";
import { type Editor as TipTapEditor } from "@tiptap/core";
import { useEffect, useState } from "react";
import Markdown from "./Markdown";
import { parseMKD } from "@/config/parseMKD";

type NovelEditorProps = {
  markupContent: string;
  novelJSONContent: any;
  isEditor: boolean;
};

export default function NovelEditorAndDisplay({
  markupContent,
  novelJSONContent,
  isEditor,
}: NovelEditorProps) {
  const [htmlContent, setHtmlContent] = useState(parseMKD(markupContent));
  const [JSONContent, setJSONContent] = useState(novelJSONContent);


  const handleImageUpload = async () => {
    const response = await fetch("/api/upload");

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log({ data });
    return data.filePath; // Return the Blob URL to the uploaded file
  };
  useEffect(() => {
    handleImageUpload();
  }, []);

  console.log({ novelJSONContent, JSONContent });

  return (
    <div className="markdown flex-col flex gap-3 h-full">
      {isEditor ? (
        <Editor
          defaultValue={{
            type: "doc",
            content: [novelJSONContent as any],
          }}
          onDebouncedUpdate={(editor?: TipTapEditor) => {
            setHtmlContent(editor?.getHTML() as any);
            setJSONContent(editor?.getJSON() as any);
          }}
          disableLocalStorage={true}
          className="!p-0 m-0 shadow-none custom-editor"
        />
      ) : (
        <Markdown>{htmlContent}</Markdown>
      )}
    </div>
  );
}
