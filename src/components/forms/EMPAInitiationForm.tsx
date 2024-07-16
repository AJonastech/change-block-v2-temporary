"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  //  Upload,
} from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FileUploader from "../FileUploader";
import { toast } from "react-toastify";
import EMPAGeneratorLoadingModal from "@/components/EMPAGeneratorLodingModal";
import { useRouter } from "next/navigation";
import SlideIntoView from "../SlideIntoView";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";

const empaInitiationFormSchema = z.object({
  companyName: z.string().min(1, "Please enter your Company's name"),
  industry: z.string().optional(), // Assuming that the industry dropdown can be empty
  projectName: z.string().min(1, "Please enter the name of your project"),
  country: z.string().optional(), // Assuming that the country dropdown can be empty,
  file: z.string().url("File must be a valid URL"),
});

type EMPAInitiationFormType = z.infer<typeof empaInitiationFormSchema>;

const formFields: Array<{
  name: keyof EMPAInitiationFormType;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
}> = [
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
    name: "country",
    label: "Please select the country where the project is",
    placeholder: "Select Country",
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
    name: "file",
    label: "Upload File",
    type: "file",
    required: true,
    placeholder: "Select File",
  },
];

const industryOptions = ["Technology", "Finance", "Healthcare"];
const countryOptions = ["USA", "Canada", "UK"];

const EMPAInitiationForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<EMPAInitiationFormType>({
    resolver: zodResolver(empaInitiationFormSchema),
    defaultValues: {
      companyName: "Test",
      industry: "Technology",
      projectName: "Test",
      country: "USA",
    },
  });

  console.log(form.formState.isValid);

  const onSubmit = async (values: EMPAInitiationFormType) => {
    toast.success("Form submitted successfully!");
    router.push("/EMPA/home?data=report");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  gap-[3rem] flex flex-col py-[2rem] px-[3rem]  w-full "
      >
        {formFields.map((fieldItem, index) => (
          <React.Fragment key={index}>
            {fieldItem.type === "text" && (
              <FormField<EMPAInitiationFormType>
                name={fieldItem.name}
                render={({ field }) => (
                  // <SlideIntoView key={fieldItem.name} index={index}>
                  //   <Input
                  //     label={fieldItem.label}
                  //     placeholder={fieldItem.placeholder as string}
                  //     {...field}
                  //     type={fieldItem.type}
                  //     className="placeholder:text-lg w-full placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
                  //     classNames={{
                  //       label: " font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                  //       input: ["bg-transparent"],

                  //       innerWrapper: "bg-transparent px-4  ",
                  //       inputWrapper: ["bg-transparent border-[1px] !h-[3.5rem]"],
                  //     }}
                  //     color={form.formState.errors[field.name as keyof typeof form.formState.errors] ? "danger" : "default"}
                  //     description={form.formState.errors[field.name as keyof typeof form.formState.errors]?.message}
                  //     variant="bordered"
                  //     labelPlacement="outside"
                  //   />
                  // </SlideIntoView>
                  <Input
                    key={fieldItem.name}
                    label={fieldItem.label}
                    placeholder={fieldItem.placeholder as string}
                    {...field}
                    type={fieldItem.type}
                    className="placeholder:text-lg w-full placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
                    classNames={{
                      label:
                        " font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                      input: ["bg-transparent"],

                      innerWrapper: "bg-transparent px-4  ",
                      inputWrapper: ["bg-transparent border-[1px] !h-[3.5rem]"],
                    }}
                    color={
                      form.formState.errors[
                        field.name as keyof typeof form.formState.errors
                      ]
                        ? "danger"
                        : "default"
                    }
                    description={
                      form.formState.errors[
                        field.name as keyof typeof form.formState.errors
                      ]?.message
                    }
                    variant="bordered"
                    labelPlacement="outside"
                  />
                )}
              />
            )}

            {fieldItem.type === "dropdown" && (
              <FormField<EMPAInitiationFormType>
                name={fieldItem.name}
                render={({ field }) => (
                  // <SlideIntoView key={fieldItem.name} index={index}>
                  //   <Select
                  //     defaultSelectedKeys={[field.value]}
                  //     onChange={field.onChange}
                  //     isRequired
                  //     label={
                  //       fieldItem.name === "industry"
                  //         ? "Industry or Sector"
                  //         : "Country"
                  //     }
                  //     variant="bordered"
                  //     placeholder={
                  //       field.name === "industry"
                  //         ? "Select industry"
                  //         : "Select country"
                  //     }
                  //     className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]  "
                  //     classNames={{
                  //       label:
                  //         " font-normal pb-4  font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                  //       innerWrapper: "bg-transparent px-4 !",
                  //       trigger: "!border-[1px] !h-[3.5rem]",
                  //       listbox: "!bg-background",
                  //       listboxWrapper: "!bg-background !p-0",
                  //     }}
                  //     name="service"
                  //     labelPlacement="outside"
                  //   >
                  //     {(fieldItem.name === "industry"
                  //       ? industryOptions
                  //       : countryOptions
                  //     ).map((option) => (
                  //       <SelectItem className="capitalize" key={option}>
                  //         {option}
                  //       </SelectItem>
                  //     ))}
                  //   </Select>
                  // </SlideIntoView>
                  <Select
                    key={fieldItem.name}
                    defaultSelectedKeys={[field.value]}
                    onChange={field.onChange}
                    isRequired
                    label={
                      fieldItem.name === "industry"
                        ? "Industry or Sector"
                        : "Country"
                    }
                    variant="bordered"
                    placeholder={
                      field.name === "industry"
                        ? "Select industry"
                        : "Select country"
                    }
                    className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]  "
                    classNames={{
                      label:
                        " font-normal pb-4  font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                      innerWrapper: "bg-transparent px-4 !",
                      trigger: "!border-[1px] !h-[3.5rem]",
                      listbox: "!bg-background",
                      listboxWrapper: "!bg-background !p-0",
                    }}
                    name="service"
                    labelPlacement="outside"
                  >
                    {(fieldItem.name === "industry"
                      ? industryOptions
                      : countryOptions
                    ).map((option) => (
                      <SelectItem className="capitalize" key={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            )}
            {fieldItem.type === "file" && (
              <FormField<EMPAInitiationFormType>
                name={fieldItem.name}
                render={({ field }) => (
                  // <SlideIntoView key={fieldItem.name} index={index}>
                  //   <FileUploader onFilesChange={field.onChange} />
                  //   <span className="text-xs text-red-500">
                  //     {
                  //       form.formState.errors[
                  //         field.name as keyof typeof form.formState.errors
                  //       ]?.message
                  //     }
                  //   </span>
                  // </SlideIntoView>
                  <div className="" key={fieldItem.name}>
                    <FileUploader onFilesChange={field.onChange} />
                    <span className="text-xs text-red-500">
                      {
                        form.formState.errors[
                          field.name as keyof typeof form.formState.errors
                        ]?.message
                      }
                    </span>
                  </div>
                )}
              />
            )}
          </React.Fragment>
        ))}

        <EMPAGeneratorLoadingModal valid={form.formState.isValid} />
      </form>
    </FormProvider>
  );
};

export default EMPAInitiationForm;
