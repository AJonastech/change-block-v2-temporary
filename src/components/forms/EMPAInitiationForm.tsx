"use client";
import React, { useEffect, useState } from "react";
import { Input, Select, SelectItem, Avatar, Button } from "@nextui-org/react";
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
  client_industry: z.string().optional(),
  client_project_name: z.string().min(1, "Please enter the name of your project"),
  client_country: z.string().optional(),
  client_files: z.array(z.string().url("File must be a valid URL").optional()).optional(),
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

const industryOptions = [
  "Renewable Energy",
  "Forestry",
  "Energy Efficiency",
  "Infrastructure",
  "Mining",
  "Professional Services",
  "Water Services",
  "Waste Management",
  "Transportation",
  "Agriculture",
  "Manufacturing",
  "Technology",
  "Tourism and Hospitality",
];

const defaultValues = {
  client_name: "",
  client_industry: "",
  client_project_name: "",
  client_country: "",
};

const EMPAInitiationForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<EMPAInitiationFormType>({
    resolver: zodResolver(empaInitiationFormSchema),
    defaultValues,
  });

  const [countryOptions, setCountryOptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountryOptions(
        data
          .map((country: any) => ({
            name: country.name.common,
            flag: country.flags.svg,
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name))
      );
    };
    fetchCountries();
  }, []);

  const handleSuccess = () => {

  };

  const { mutate, data, error, isSuccess, isError, isPending } = usePost({
    handleSuccess,
    mutateFn: (data: EMPAInitiationFormType) => createEmpaReport(data),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [isError, error?.message]);

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit =  (values: EMPAInitiationFormType) => {
 
     mutate(values);
    if (isSuccess) {
      // toast.success("Form submitted successfully!");
      return router.push(`/EMPA/introduction?data=report&&id=${data.report_id}&&status=GENERATING`);
    }
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
                    label={fieldItem.label}
                    variant="bordered"
                    placeholder={fieldItem.placeholder}
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
                    {fieldItem.name === "client_industry"
                      ? industryOptions.map((option) => (
                        <SelectItem className="capitalize" key={option}>
                          {option}
                        </SelectItem>
                      ))
                      : countryOptions.map((option) => (
                        <SelectItem
                          className="capitalize"
                          key={option.name}
                          startContent={
                            <Avatar
                              alt={option.name}
                              className="w-6 h-6"
                              src={option.flag}
                            />
                          }
                        >
                          {option.name}
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
                    <FileUploader
                      onFilesChange={(files) =>
                        field.onChange(
                          Array.isArray(files) ? files : []
                        )
                      }
                    />
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
          <Button
        type="submit"
      
        color="primary"
        className="rounded-xl w-fit !bg-primary"
        size="lg"
        isLoading={isPending}

      >
        Generate EMPA
      </Button>
        {/* <EMPAGeneratorLoadingModal valid={form.formState.isValid} /> */}
      </form>
    </FormProvider>
  );
};

export default EMPAInitiationForm;
