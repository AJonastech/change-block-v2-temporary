"use client";

import React from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const empaEditFormSchema = z.object({
  title: z.string().min(1, "Please enter a title"),
  description: z
    .string()
    .min(1, "Please enter a description")
    .max(300, "Description cannot exceed 300 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.string().min(1, "Please select a priority"),
});

type EMPAEditFormType = z.infer<typeof empaEditFormSchema>;

const categoryOptions = ["Bug", "Feature Request", "General Inquiry"];
const priorityOptions = ["Low", "Medium", "High"];

const EMPAEditForm = ({ onClose }: { onClose?: () => void }) => {
  const router = useRouter();
  const form = useForm<EMPAEditFormType>({
    resolver: zodResolver(empaEditFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority: "",
    },
  });

  const onSubmit = async (values: EMPAEditFormType) => {
    toast.success("Form submitted successfully!");
    // Handle form submission
    router.push("/some-path");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-6 flex flex-col py-[53px] px-8 w-full  mx-auto bg-white rounded-md"
      >
        <h6 className="heading-h6 font-semibold">Add Complaint Ticket</h6>
        <p className="text-base text-grey-300 font-medium pb-4">
          Please provide details about the issue you are experiencing in the
          EMPA Wizard. Include any error messages received, steps taken to
          troubleshoot, and any additional information that may help our support
          team resolve the issue promptly.
        </p>

        <Input
          label="Title"
          placeholder="Enter Title"
          {...form.register("title")}
          className="placeholder:text-lg w-full placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px] "
          color={form.formState.errors.title ? "danger" : "default"}
          description={form.formState.errors.title?.message}
          variant="bordered"
          labelPlacement="outside"
          classNames={{
            label: ` font-normal font-satoshi  pb-4 !text-lg leading-[25.2px] ${
              form.formState.errors.description
                ? "text-red-500"
                : "!text-grey-500"
            } `,
            input: ["bg-transparent"],

            innerWrapper: "bg-transparent px-4  ",
            inputWrapper: ["bg-transparent border-[1px] !h-[3.5rem]"],
            description: `${
              form.formState.errors.description ? "text-red-500" : ""
            } `,
          }}
        />

        <Textarea
          label="Description"
          placeholder="Type Description here"
          {...form.register("description")}
          className="placeholder:text-lg w-full placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px] no-scrollbar"
          color={form.formState.errors.description ? "danger" : "default"}
          description={form.formState.errors.description?.message}
          variant="bordered"
          labelPlacement="outside"
          classNames={{
            input: " !min-h-[calc(220px-1rem)] ",
            label: `${
              form.formState.errors.description
                ? "text-red-500"
                : "!text-grey-500"
            } font-normal font-satoshi  pb-4 !text-lg leading-[25.2px]`,

            innerWrapper: "bg-transparent px-4 pt-2  ",
            inputWrapper: ["bg-transparent border-[1px]  pb-[4rem]"],
            description: `${
              form.formState.errors.description ? "text-red-500" : ""
            } `,
          }}
        />
        <span className="-translate-y-[4rem] px-[2rem] text-sm text-grey-300">1/300</span>

        <div className="flex gap-4 pt-4">
          <Select
            label="Category"
            placeholder="Choose an option"
            {...form.register("category")}
            className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]  "
            classNames={{
              label:
                " font-normal pb-4  font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
              innerWrapper: "bg-transparent px-4 !",
              trigger: "!border-[1px] !h-[3.5rem]",
              listbox: "!bg-background",
              listboxWrapper: "!bg-background !p-0",
            }}
            color={form.formState.errors.category ? "danger" : "default"}
            description={form.formState.errors.category?.message}
            variant="bordered"
            labelPlacement="outside"
          >
            {categoryOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Priority"
            placeholder="Choose an option"
            {...form.register("priority")}
            className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]  "
            classNames={{
              label:
                " font-normal pb-4  font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
              innerWrapper: "bg-transparent px-4 !",
              trigger: "!border-[1px] !h-[3.5rem]",
              listbox: "!bg-background",
              listboxWrapper: "!bg-background !p-0",
            }}
            color={form.formState.errors.priority ? "danger" : "default"}
            description={form.formState.errors.priority?.message}
            variant="bordered"
            labelPlacement="outside"
          >
            {priorityOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex justify-start gap-4">
          <Button type="submit" color="primary">
            Submit
          </Button>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EMPAEditForm;
