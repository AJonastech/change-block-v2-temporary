"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useFetchData } from "@/hooks/useFetchData";
import { getAllTeams, getTeamChannels, saveTeamChannel } from "@/actions/IasActions";
import usePost from "@/hooks/usePostData";
import { toast } from "react-toastify";

const channelSettingsFormSchema = z.object({
  team_id: z.string().min(1, "Please select a team"),
  channel_id: z.string().min(1, "Please select a channel"),
  project_id: z.string().min(1, "Please enter the project key"),
});

type ChannelSettingsFormType = z.infer<typeof channelSettingsFormSchema>;

function AutomatedChannelSettingsForm() {
  const form = useForm<ChannelSettingsFormType>({
    resolver: zodResolver(channelSettingsFormSchema),
  });

  // Fetch teams
  const {
    data: teams,
    isError: isTeamsError,
    error: teamsError,
  } = useFetchData(["teams-details"],()=> getAllTeams());

  console.log(teams)
  // Fetch channels based on selected team
  const selectedTeamId = form.watch("team_id");

  const {
    data: channels,
    isError: isChannelsError,
    error: channelsError,
  } = useFetchData(
    ["channels", selectedTeamId],
    () => getTeamChannels(selectedTeamId),
    !!selectedTeamId // Enable fetching only when a team is selected
  );

const handleSuccess=(data:any)=>{
toast.success(data.details)
}
  const {mutate, isSuccess, isError, error} = usePost({
    handleSuccess:handleSuccess,
    mutateFn:(data)=>saveTeamChannel(data)
  })
  useEffect(()=>{
    if(isError){
      console.log(error)
    }
  },[isError])
  const onSubmit = (data: ChannelSettingsFormType) => {
     mutate(data)
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Team Select */}
        <FormField<ChannelSettingsFormType>
          name="team_id"
          render={({ field }) => (
            <Select
              defaultSelectedKeys={[field.value]}
              onChange={field.onChange}
              isRequired
              label="Team"
              variant="bordered"
              placeholder="Select Team"
              className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
              classNames={{
                label: "font-normal pb-4 font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                innerWrapper: "bg-transparent px-4",
                trigger: "!border-[1px] !h-[3.5rem]",
                listbox: "!bg-background",
                listboxWrapper: "!bg-background !p-0",
                selectorIcon: "text-grey-100",
              }}
              name="team"
              labelPlacement="outside"
            >
              {teams?.teams?.map((team: { id: string; display_name: string }) => (
                <SelectItem className="capitalize" key={team.id} value={team.id}>
                  {team.display_name}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        {/* Channel Select */}
        <FormField<ChannelSettingsFormType>
          name="channel_id"
          render={({ field }) => (
            <Select
              defaultSelectedKeys={[field.value]}
              onChange={field.onChange}
              isRequired
              label="Channel"
              variant="bordered"
              placeholder="Select Channel"
              className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
              classNames={{
                label: "font-normal pb-4 font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                innerWrapper: "bg-transparent px-4",
                trigger: "!border-[1px] !h-[3.5rem]",
                listbox: "!bg-background",
                listboxWrapper: "!bg-background !p-0",
                selectorIcon: "text-grey-100",
              }}
              name="channelName"
              labelPlacement="outside"
            >
              {channels?.channels?.map((channel: { id: string; display_name: string }) => (
                <SelectItem className="capitalize" key={channel.id} value={channel.id}>
                  {channel.display_name}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        {/* Project Key Input */}
        <FormField<ChannelSettingsFormType>
          name="project_id"
          render={({ field }) => (
            <Input
              label="Project Key (From Jira)"
              placeholder="Type Project Key here"
              {...field}
              type="text"
              className="placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
              classNames={{
                label: "font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                input: ["bg-transparent"],
                innerWrapper: "bg-transparent px-4",
                inputWrapper: ["bg-transparent border-[1px] !h-[3.5rem]"],
              }}
              color={form.formState.errors[field.name as keyof typeof form.formState.errors] ? "danger" : "default"}
              description={form.formState.errors[field.name as keyof typeof form.formState.errors]?.message}
              variant="bordered"
              labelPlacement="outside"
            />
          )}
        />

        {/* Submit and Reset Buttons */}
        <div className="flex items-center gap-4">
          <Button isLoading={form.formState.isSubmitting} type="submit" size="lg" color="primary" className="py-4 !bg-primary px-6 text-grey-20">
            Save
          </Button>
          <Button type="reset" size="lg" variant="bordered" className="bg-transparent text-lg text-grey-100">
            Reset
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AutomatedChannelSettingsForm;
