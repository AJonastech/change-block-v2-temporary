"use client"
import React, { useEffect } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { Button, Select, SelectItem } from "@nextui-org/react";
import EmailTextarea from "../EmailTextArea";
import { useFetchData } from "@/hooks/useFetchData";
import { getAllTeams, getTeamChannels, getWeeklyChannelInsight, saveWeeklyInsightChannel } from "@/actions/IasActions";
import usePost from "@/hooks/usePostData";
import { toast } from "react-toastify";


const channelSettingsFormSchema = z.object({
    team_id: z.string().min(1, "Please select a team"),
    channel_id: z.string().min(1, "Please select a channel"),
    emails: z.array(z.string().email("Invalid email address")).min(1, "Please enter at least one email address"),
});

type ChannelSettingsFormType = z.infer<typeof channelSettingsFormSchema>;

function WeeklyChannelSettingsForm() {
    const form = useForm<ChannelSettingsFormType>({
        resolver: zodResolver(channelSettingsFormSchema),
    });

    // Fetch teams
    const {
        data: teams,
        isError: isTeamsError,
        error: teamsError,
    } = useFetchData(["teams-details"], () => getAllTeams());

    // Fetch weekly channel insight
    const {
        data: channelInsight,
        isError: isChannelError,
        error: channelError,
    } = useFetchData(["channel-insights"], () => getWeeklyChannelInsight());

    // Populate form fields with fetched data
    useEffect(() => {
        if (channelInsight) {
            form.reset(channelInsight);
        }
    }, [channelInsight, form]);

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

    const handleSuccess = (data:any) => {
        // Handle success logic here
        toast.success(data.details)
    };

    const { mutate, data, isSuccess, isError, error, isPending } = usePost({
        handleSuccess,
        mutateFn: (data) => saveWeeklyInsightChannel(data),
    });

    useEffect(() => {
        if (isError) {
           toast.error(error?.message)
        }
    }, [isError]);

    const onSubmit = (data: ChannelSettingsFormType) => {
        mutate(data);
    };
   
    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Team Select */}
                <FormField<ChannelSettingsFormType>
                    name="team_id"
                    render={({ field }) => (
                        <Select
                            value={field.value}
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
                            value={field.value}
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

                {/* Email Addresses Input */}
                <Controller
                    name="emails"
                    control={form.control}
                    render={({ field }) => (
                        <EmailTextarea value={field.value} onChange={field.onChange} />
                    )}
                />

                {/* Submit and Reset Buttons */}
                <div className="flex items-center gap-4">
                    <Button isLoading={isPending} type="submit" size="lg" color="primary" className="py-4 !bg-primary px-6 text-grey-20">
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

export default WeeklyChannelSettingsForm;
