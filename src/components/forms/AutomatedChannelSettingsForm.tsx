"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import FormField from './FormField'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useFetchData } from '@/hooks/useFetchData'
import { getAllTeams } from '@/actions/IasActions'
import { useQuery } from '@tanstack/react-query'





const channelSettingsFormSchema = z.object({
    team: z.string().min(1, "Please enter the name of the team"),
    channelName: z.string().min(1, "Please enter the name of the channel"),
    projectKey: z.string().min(1, "Please enter the project key"),
})

type ChannelSettingsFormType = z.infer<typeof channelSettingsFormSchema>;
function AutomatedChannelSettingsForm() {
    const form = useForm<ChannelSettingsFormType>({
        resolver: zodResolver(channelSettingsFormSchema)
    })



    const { data: teamOption, isError, error } = useFetchData(["teams"], ()=>getAllTeams())
    const teamOptions = ["team A", "Team B", "Team C"]

   
    const onSubmit = (data: ChannelSettingsFormType) => {

        //do something with the data here
    }
    return (
        <FormProvider {...form}>
            <form className='flex flex-col gap-10' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField<ChannelSettingsFormType>
                    name={"team"}
                    render={({ field }) => (
                        <Select
                            defaultSelectedKeys={[field.value]}
                            onChange={field.onChange}
                            isRequired
                            label="Team"
                            variant="bordered"

                            placeholder="Select Team"

                            className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]  "
                            classNames={{
                                label: " font-normal pb-4  font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                                innerWrapper: "bg-transparent px-4 !",
                                trigger: "!border-[1px] !h-[3.5rem]",
                                listbox: "!bg-background",
                                listboxWrapper: "!bg-background !p-0",
                                selectorIcon: "text-grey-100"
                            }}
                            name="service"
                            labelPlacement="outside"
                        >
                            {teamOptions.map((option) => (
                                <SelectItem className="capitalize" key={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </Select>


                    )}

                />
                <FormField<ChannelSettingsFormType>
                    name={"team"}
                    render={({ field }) => (

                        <Select
                            defaultSelectedKeys={[field.value]}
                            onChange={field.onChange}
                            isRequired
                            label="Channel"
                            variant="bordered"

                            placeholder="Select Channel"

                            className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]  "
                            classNames={{
                                label: " font-normal pb-4  font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                                innerWrapper: "bg-transparent px-4 !",
                                trigger: "!border-[1px] !h-[3.5rem]",
                                listbox: "!bg-background",
                                listboxWrapper: "!bg-background !p-0",
                                selectorIcon: "text-grey-100"
                            }}
                            name="service"
                            labelPlacement="outside"
                        >
                            {teamOptions.map((option) => (
                                <SelectItem className="capitalize" key={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </Select>


                    )}

                />

                <FormField<ChannelSettingsFormType>

                    name={"projectKey"}
                    render={({ field }) => (
                        <Input
                            label={"Project Key ( From Jira)"}
                            placeholder="Type Project Key here"
                            {...field}
                            type="text"
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

                    )}

                />
                <div className='flex items-center gap-4'>
                    <Button type='submit' size="lg" color='primary' className='py-4 !bg-primary px-6  text-grey-20'>
                        Save
                    </Button>
                    <Button type="reset" size="lg" variant='bordered' className='bg-transparent text-lg text-grey-100 '>
                        Reset
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default AutomatedChannelSettingsForm