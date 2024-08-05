"use client"
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FileUploader from "../FileUploader";
import { toast } from "react-toastify";
import EMPAGeneratorLoadingModal from "@/components/EMPAGeneratorLodingModal";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import usePost from "@/hooks/usePostData";
import { createEmpaReport } from "@/actions/EmpaActions";

const empaInitiationFormSchema = z.object({
  client_name: z.string().min(1, "Please enter your Company's name"),
  client_industry: z.string().optional(), // Assuming that the industry dropdown can be empty
  client_project_name: z.string().min(1, "Please enter the name of your project"),
  client_country: z.string().optional(), // Assuming that the country dropdown can be empty,
  client_files: z.array(z.string().url("File must be a valid URL")),
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
      name: "client_name",
      label: "Company Name",
      placeholder: "Enter Company Name",
      type: "text",
      required: true,
    },
    {
      name: "client_industry",
      label: "Industry or Sector",
      placeholder: "Select Industry",
      type: "dropdown",
    },
    {
      name: "client_country",
      label: "Please select the country where the project is",
      placeholder: "Select Country",
      type: "dropdown",
    },
    {
      name: "client_project_name",
      label: "Project Name",
      placeholder: "Enter Project Name",
      type: "text",
      required: true,
    },
    {
      name: "client_files",
      label: "Upload File",
      type: "file",
      required: true,
      placeholder: "Select File",
    },
  ];

const industryOptions = ["Renewable Energy", "Forestry", "Energy Efficiency", "Infrastructure", "Mining", "Professional Services", "Water Services", "Waste Management", "Transportation", "Agriculture", "Manufacturing", "Technology", "Tourism and Hospitality"];
const defaultValues = {
  client_name: "Test",
  client_industry: "Technology",
  client_project_name: "Test",
  client_country: "USA",
};

const EMPAInitiationForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<EMPAInitiationFormType>({
    resolver: zodResolver(empaInitiationFormSchema),
    defaultValues,
  });

  const [countryOptions, setCountryOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountryOptions(data.map((country: any) => country.name.common).sort());
    };
    fetchCountries();
  }, []);

  const handleSuccess = () => {
    // Handle success actions here
    toast.success("Form submitted successfully!");
    return router.push("/EMPA/home?data=report");
  }

  const { mutate, error, isSuccess, isError } = usePost({ handleSuccess, mutateFn: (data: EMPAInitiationFormType) => createEmpaReport(data) });

  if (isError) {
    toast.error("This is an error");
    console.log(error);
  }
  const onSubmit = async (values: EMPAInitiationFormType) => {

    await mutate(values);

  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-[3rem] flex flex-col py-[2rem] px-[3rem] w-full"
      >
        {formFields.map((fieldItem, index) => (
          <React.Fragment key={index}>
            {fieldItem.type === "text" && (
              <FormField<EMPAInitiationFormType>
                name={fieldItem.name}
                render={({ field }) => (
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
                      innerWrapper: "bg-transparent px-4",
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
                  <Select
                    key={fieldItem.name}
                    defaultSelectedKeys={[field.value]}
                    onChange={field.onChange}
                    isRequired
                    label={
                      fieldItem.name === "client_industry"
                        ? "Industry or Sector"
                        : "Country"
                    }
                    variant="bordered"
                    placeholder={
                      field.name === "industry"
                        ? "Select industry"
                        : "Select country"
                    }
                    className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
                    classNames={{
                      label:
                        " font-normal pb-4 font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                      innerWrapper: "bg-transparent px-4",
                      trigger: "!border-[1px] !h-[3.5rem]",
                      listbox: "!bg-background",
                      listboxWrapper: "!bg-background !p-0",
                    }}
                    name="service"
                    labelPlacement="outside"
                  >
                    {(fieldItem.name === "client_industry"
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
                  <div className="" key={fieldItem.name}>
                    <FileUploader onFilesChange={(files) => field.onChange(Array.isArray(files) ? files.map(file => URL.createObjectURL(file)) : [])} />
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
