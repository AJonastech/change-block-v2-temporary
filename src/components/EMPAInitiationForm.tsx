"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownItem,
  Select,
  SelectItem,
  //  Upload,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import SubmitButton from "./SubmitButton";

import FileUploader from "./FileUploader";
import { toast } from "react-toastify";
import EMPAGeneratorLoadingModal from "@/components/EMPAGeneratorLodingModal";
import { useRouter } from "next/navigation";
import SlideIntoView from "./SlideIntoView";

const formFields = [
  {
    name: "companyName",
    label: "Company Name",
    placeholder: "Enter Company Name",
    type: "text",
    required: true,
  },
  {
    name: "industry",
    label: "Industry or Sector",
    placeholder: "Select Industry",
    type: "dropdown",
  },
  {
    name: "projectName",
    label: "Project Name",
    placeholder: "Enter Project Name",
    type: "text",
    required: true,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Select Country",
    type: "dropdown",
  },
  { name: "file", label: "Upload File", type: "file", required: true },
];

const industryOptions = ["Technology", "Finance", "Healthcare"];
const countryOptions = ["USA", "Canada", "UK"];

interface TErrors {
  [key: string]: string;
}

const EMPAInitiationForm: React.FC = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<TErrors>({});
  const [valid, setValid] = useState(false);

  const validateField = (name: string, value: string) => {
    const field = formFields.find((field) => field.name === name);
    let error = "";

    if (field?.required && value.trim() === "") {
      error = `${field.label} is required`;
    }

    return error;
  };
  const validateForm = (formData: FormData) => {
    const newErrors: TErrors = {};
    formFields.forEach((field) => {
      const value = formData.get(field.name)?.toString() || "";
      const error = validateField(field.name, value);
      if (error && field.required) {
        newErrors[field.name] = error;
      }
    });
    console.log({ newErrors });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleFormAction = async (formData: FormData) => {
    const isValid = validateForm(formData);
    setValid(isValid);
    if (isValid) {
      toast.success("Form submitted successfully!");
      console.log("Form submitted successfully:", formData);
      router.push("/EMPA-generator/home?data=report");
    } else {
      toast.error("Failed to submit form. Please try again.");
    }
  };

  return (
    <form
      action={handleFormAction}
      className="  gap-[3rem] flex flex-col py-[2rem] px-[3rem] w-full !min-w-full "
    >
      {formFields.map((field, index) => (
        <div key={field.name} className="w-full">
          {field.type === "text" && (
            <SlideIntoView key={field.name} index={index}>
              <Input
                label={field.label as string}
                placeholder={field.placeholder as string}
                name={field.name}
                type={field.type}
                onChange={handleChange}
                className="placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
                classNames={{
                  label: " font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                  input: ["bg-transparent"],
                
                  innerWrapper: "bg-transparent px-4  ",
                  inputWrapper: ["bg-transparent border-[1px] !h-[3.5rem]"],
                }}
                color={errors[field.name] ? "danger" : "default"}
                description={errors[field.name] as string}
                variant="bordered"
                labelPlacement="outside"
              />
            </SlideIntoView>
          )}
          {field.type === "dropdown" && (
            <>
              <SlideIntoView key={field.name} index={index}>
                <Select
                  isRequired
                  label={
                    field.name === "industry" ? "Industry or Sector" : "Country"
                  }
                  variant="bordered"
                  placeholder={
                    field.name === "industry"
                      ? "Select industry"
                      : "Select country"
                  }
                  className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]  "
                  classNames={{
                    label: " font-normal pb-4  font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                    innerWrapper: "bg-transparent px-4 !",
                    trigger: "!border-[1px] !h-[3.5rem]",
                    listbox: "!bg-background",
                    listboxWrapper: "!bg-background !p-0",
                  }}
                  name="service"
                  labelPlacement="outside"
                >
                  {(field.name === "industry"
                    ? industryOptions
                    : countryOptions
                  ).map((option) => (
                    <SelectItem className="capitalize" key={option}>
                      {option}
                    </SelectItem>
                  ))}
                </Select>
                {errors[field.name] && (
                  <p className="text-danger">{errors[field.name]}</p>
                )}
              </SlideIntoView>
            </>
          )}
          {field.type === "file" && (
            <SlideIntoView key={field.name} index={index}>
              <FileUploader />
            </SlideIntoView>
          )}
        </div>
      ))}
      <EMPAGeneratorLoadingModal valid={valid} />
    </form>
  );
};

export default EMPAInitiationForm;
