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
import { z } from "zod"
import FileUploader from "./FileUploader";
import { toast } from "react-toastify";
import EMPAGeneratorLoadingModal from "@/components/EMPAGeneratorLodingModal";
import { useRouter } from "next/navigation";
import SlideIntoView from "./SlideIntoView";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./forms/FormField";






const empaInitiationFormSchema = z.object({
  companyName: z.string().min(1, "Please enter your Company's name"),
  industry: z.string().optional(), // Assuming that the industry dropdown can be empty
  projectName: z.string().min(1, "Please enter the name of your project"),
  country: z.string().optional(), // Assuming that the country dropdown can be empty
});




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
  { name: "file", label: "Upload File", type: "file", required: true },
];

const industryOptions = ["Technology", "Finance", "Healthcare"];
const countryOptions = ["USA", "Canada", "UK"];


const EMPAInitiationForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof empaInitiationFormSchema>>({
    resolver: zodResolver(empaInitiationFormSchema),
    defaultValues: {
      companyName: "Test",
      industry: "Technology",
      projectName: "Test",
      country: "USA"
    }
  })


  const onSubmit = async (values: z.infer<typeof empaInitiationFormSchema>) => {
    console.log(values, "here")
  };
  console.log(form.formState.errors, "errors")
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  gap-[3rem] flex flex-col py-[2rem] px-[3rem] w-full !min-w-full "
      >
        {formFields.map((fieldItem, index) => (
          <div key={fieldItem.name} className="w-full">
            {fieldItem.type === "text" && (
              <FormField

                name={fieldItem.name}
                render={({ field }) => (
                  <SlideIntoView key={fieldItem.name} index={index}>
                    <Input
                      label={fieldItem.label}
                      placeholder={fieldItem.placeholder as string}
                      {...field}
                      type={fieldItem.type}
                      className="placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
                      classNames={{
                        label: " font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                        input: ["bg-transparent"],

                        innerWrapper: "bg-transparent px-4  ",
                        inputWrapper: ["bg-transparent border-[1px] !h-[3.5rem]"],
                      }}
                      color={form.formState.errors[field.name as keyof typeof form.formState.errors] ? "danger" : "default"}
                      description={form.formState.errors[field.name as keyof typeof form.formState.errors]?.message}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </SlideIntoView>
                )}

              />

            )}



            {fieldItem.type === "dropdown" && (
              <FormField
                name={fieldItem.name}
                render={({ field }) => (
                  <SlideIntoView key={fieldItem.name} index={index}>
                    <Select
                      defaultSelectedKeys={[field.value]}
                      onChange={field.onChange}
                      isRequired
                      label={
                        fieldItem.name === "industry" ? "Industry or Sector" : "Country"
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
                      {(fieldItem.name === "industry"
                        ? industryOptions
                        : countryOptions
                      ).map((option) => (
                        <SelectItem className="capitalize" key={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </Select>

                  </SlideIntoView>
                )}

              />
            )}
            {fieldItem.type === "file" && (
              <FormField
                name={fieldItem.name}
                render={({ field }) => (<SlideIntoView key={fieldItem.name} index={index}>
                  <FileUploader />
                </SlideIntoView>)}
              />

            )}
          </div>
        ))}
      
        <EMPAGeneratorLoadingModal valid={true} />
      </form>
    </FormProvider>
  );
};

export default EMPAInitiationForm;
