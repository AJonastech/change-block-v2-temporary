"use client";
import { uploadFile } from "@/actions/EmpaActions";
import { useFetchData } from "@/hooks/useFetchData";
import usePost from "@/hooks/usePostData";
import { useAuthStore } from "@/store/useAuthStore";
import { Button, Progress, Spinner } from "@nextui-org/react";
import React, { useState, useCallback, useEffect } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

interface FileUploaderProps {
  initialFiles?: File[];
  onFilesChange?: (files: string[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  initialFiles = [],
  onFilesChange,
}) => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [filesForUpload, setFilesForUpload] = useState<File[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(true);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadComplete, setUploadComplete] = useState<{ [key: string]: boolean }>({});
  const { accessToken } = useAuthStore();
  const handleSuccess = () => {
 
  };

  console.log(accessToken)

  const uploadFile = async (file: File, onProgress: (progress: number) => void) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_target", "DOCUMENT");

    try {
      const response = await fetch("https://api.cbinternaltools.com/v1/misc/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach the access token here
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      return data.url; // Assuming the response contains a URL to the uploaded file

    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const { mutate, error, isSuccess, isError, isPending, data } = usePost({
    handleSuccess,
    mutateFn: async (file: File) => {
      try {
        const url = await uploadFile(file, (progress) => {
          setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
        });
        setFileUrls((prevUrls) => [...prevUrls, url]); // Update state with new URL
        setUploadComplete((prev) => ({ ...prev, [file.name]: true })); // Mark this file as complete
        return url; // Return the uploaded file's URL
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (isError) {

    }
    // if (onFilesChange && fileUrls) {
    //   console.log({ fileUrls, urls });
    //   onFilesChange(fileUrls);
    // }
  }, [isError, error?.message]);

  const handleFilesChange = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
  }, []);

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDraggingOver(true);

      const droppedFiles = Array.from(event.dataTransfer.files).filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/msword" ||
          file.type === "text/plain"
      );

      handleFilesChange([...files, ...droppedFiles]);

      if (droppedFiles.length > 0) {
        droppedFiles.forEach(async (file) => {
          await mutate(file); // Trigger the upload for each file
        });
      }
    },
    [files, mutate, handleFilesChange]
  );

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files ?? []).filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword" ||
        file.type === "text/plain"
    );

    handleFilesChange([...files, ...selectedFiles]);

    if (selectedFiles.length > 0) {
      selectedFiles.forEach(async (file) => {
        await mutate(file); // Trigger the upload for each file
      });
    }
  };



  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    handleFilesChange(updatedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  console.log({ fileUrls, isPending });

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className=" font-normal font-satoshi !text-grey-500  !text-lg leading-[25.2px] pl-1">
        Upload File
      </label>
      <div
        className={`px-5 border-[1px]  rounded-2xl py-[1rem] relative border-grey`}
        onDragExit={() => {
          setIsDraggingOver(true);
        }}
        onDragEnd={() => {
          setIsDraggingOver(true);
        }}
        onDragEnter={() => {
          setIsDraggingOver(false);
        }}
        onDrop={(event) => {
          const droppedFiles = Array.from(event.dataTransfer.files).filter(
            (file) =>
              file.type === "application/pdf" ||
              file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
              file.type === "application/msword" ||
              file.type === "text/plain"
          );
          setFilesForUpload(droppedFiles);
          handleDrop(event);
        }}
        onDragOver={handleDragOver}
      >
        <label
          className={` ${!isDraggingOver ? "-dashed -primary-100 opacity-25" : "-grey"
            } flex justify-between items-center sm:flex-row flex-col sm:gap-4 cursor-pointer`}
        >
          <div className="flex justify-start items-center gap-3">
            <input
              type="file"
              multiple
              onChange={(event) => {
                const selectedFiles = Array.from(
                  event.target.files ?? []
                ).filter(
                  (file) =>
                    file.type === "application/pdf" ||
                    file.type ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                    file.type === "application/msword" ||
                    file.type === "text/plain"
                );
                setFilesForUpload(selectedFiles);
                handleFileSelect(event);
              }}
              className="hidden"
              name="file"
            />
            <svg
              width="52"
              height="52"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-[40px] sm:h-[40px]"
            >
              <path
                d="M15.708 43.5007V43.2832C15.708 41.1927 15.708 39.2739 15.9183 37.7152C16.1478 35.9969 16.6916 34.1796 18.1851 32.6885C19.6786 31.1926 21.4959 30.6488 23.2118 30.4168C24.7729 30.209 26.6918 30.209 28.7846 30.209H29.2148C31.3076 30.209 33.2264 30.209 34.7852 30.4192C36.5034 30.6488 38.3208 31.1926 39.8118 32.6861C41.3078 34.1796 41.8515 35.9969 42.0835 37.7127C42.2889 39.2522 42.2913 41.1347 42.2913 43.1913C48.5094 41.8622 53.1663 36.3957 53.1663 29.8513C53.1663 23.8822 49.2828 18.8023 43.8743 16.9536C43.1058 10.1362 37.2526 4.83398 30.15 4.83398C22.523 4.83398 16.3412 10.9433 16.3412 18.4809C16.3412 20.1484 16.6433 21.7434 17.1967 23.2224C16.5358 23.094 15.8641 23.0292 15.1908 23.0291C9.47059 23.0315 4.83301 27.6135 4.83301 33.2661C4.83301 38.9187 9.47059 43.5007 15.1908 43.5007H15.708Z"
                fill="#797A76"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.9997 33.834C24.4418 33.834 22.1653 33.834 20.7492 35.2502C19.333 36.6663 19.333 38.9428 19.333 43.5007C19.333 48.0585 19.333 50.335 20.7492 51.7512C22.1653 53.1673 24.4418 53.1673 28.9997 53.1673C33.5575 53.1673 35.834 53.1673 37.2502 51.7512C38.6663 50.335 38.6663 48.0585 38.6663 43.5007C38.6663 38.9428 38.6663 36.6663 37.2502 35.2502C35.834 33.834 33.5575 33.834 28.9997 33.834ZM33.3618 41.287L30.1379 38.0656C29.8358 37.7642 29.4264 37.595 28.9997 37.595C28.5729 37.595 28.1636 37.7642 27.8614 38.0656L24.6376 41.287C24.4819 41.4353 24.3575 41.6132 24.2716 41.8103C24.1857 42.0073 24.1401 42.2196 24.1375 42.4346C24.1348 42.6496 24.1752 42.8629 24.2563 43.062C24.3374 43.2611 24.4574 43.442 24.6095 43.594C24.7615 43.7461 24.9424 43.8661 25.1415 43.9472C25.3406 44.0282 25.5539 44.0687 25.7689 44.066C25.9839 44.0634 26.1962 44.0178 26.3932 43.9319C26.5903 43.846 26.7682 43.7216 26.9165 43.5659L27.3878 43.0947V47.7975C27.3878 48.225 27.5576 48.635 27.8599 48.9373C28.1622 49.2396 28.5722 49.4094 28.9997 49.4094C29.4272 49.4094 29.8372 49.2396 30.1395 48.9373C30.4418 48.635 30.6116 48.225 30.6116 47.7975V43.0947L31.0828 43.5659C31.3875 43.856 31.7935 44.0156 32.2142 44.0104C32.6348 44.0053 33.0368 43.8359 33.3343 43.5384C33.6318 43.241 33.8012 42.839 33.8063 42.4183C33.8114 41.9976 33.6519 41.5916 33.3618 41.287Z"
                fill="#797A76"
              />
            </svg>

            <div>
              <h1 className=" text-grey-300  font-satoshi  text-lg leading-[25.2px] sm:text-sm">
                Drag and drop file here
              </h1>
              <p className="text-grey-100 font-satoshi leading-[21px]  text-[15px] sm:text-[12px]">
                Limit 200MB per file • PDF, DOCX
              </p>
            </div>
          </div>
          <div className="rounded-xl  font-satoshi  text-base bg-transparent py-4 px-6 text-grey-500 cursor-pointer transition-all ease-in duration-150 border-[1px] border-grey">
            Browse Files
          </div>
        </label>
        {files.length > 0 && (
          <hr className="w-[100%] h-[2px] bg-black-40 opacity-30 mt-6 mb-5 sm:w-full sm:mb-0" />
        )}


        {filesForUpload.map((file, index) => (
          <div key={index} className="mt-3">
            <div className="flex justify-between items-start gap-4 w-[80%] sm:w-full">
              <div className="flex justify-start items-center gap-2">
                <div className="text-black-50 text-2xl">
                  <MdInsertDriveFile />
                </div>

                <p className="text-black-50 font-Satoshi leading-5 font-medium text-md">
                  {file.name}
                </p>
                <p className="ml-3 text-black-30 font-Satoshi leading-5 font-medium text-md">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <div className="ml-10 text-black-50 text-lg">
                  {!uploadComplete[file.name] ? <Spinner /> : <Button
                    isIconOnly
                    className="ml-10 text-black-50 text-lg cursor-pointer"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <RxCross2 />
                  </Button>} {/* Show spinner only if not complete */}
                </div>
              </div>
            </div>

            {index === files.length - 1 && <br />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
