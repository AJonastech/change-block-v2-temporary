"use client";
import React, { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { IoMdAttach } from "react-icons/io";

interface FilePreview {
  name: string;
  size: number;
  type: string;
  url: string;
}

const RichInput = () => {
  const [files, setFiles] = useState<FilePreview[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const filePreviews = selectedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...filePreviews]);
  };

  const removeFile = (url: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.url !== url));
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-3 p-3 border rounded-xl shadow-sm bg-white w-[calc(100%-64px)] mx-auto">
      <div className="flex items-center">
        <label htmlFor="fileInput">
          <Button isIconOnly as="span" className="bg-transparent text-2xl">
            <IoMdAttach />
          </Button>
        </label>
        <input
          className="w-full bg-transparent hover:bg-transparent outline-none"
          name="message"
          placeholder="Enter message here"
          // rows={1}
        />
        <input
          type="file"
          multiple
          className="hidden"
          id="fileInput"
          onChange={handleFileChange}
          name="file"
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file) => (
            <div key={file.url} className="flex items-center gap-2">
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
              <Button
                isIconOnly
                variant="light"
                onClick={() => removeFile(file.url)}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RichInput;
