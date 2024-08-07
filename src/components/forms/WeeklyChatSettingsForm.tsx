"use client"
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import FormField from './FormField'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useFetchData } from '@/hooks/useFetchData'
import { getAllChats, getWeeklyChatInsight, saveChatDetails, saveWeeklyInsightChat } from '@/actions/IasActions'
import usePost from '@/hooks/usePostData'
import SubmitButton from '../SubmitButton'
import EmailTextarea from '../EmailTextArea'
import { toast } from 'react-toastify'

const chatSettingsFormSchema = z.object({
    chat_id: z.string().min(1, "Please select a chat"),
    emails: z.array(z.string().email("Invalid email address")).min(1, "Please enter at least one email address"),
})

type ChatSettingsFormType = z.infer<typeof chatSettingsFormSchema>;

function WeeklyChatSettingsForm() {
    const form = useForm<ChatSettingsFormType>({
        resolver: zodResolver(chatSettingsFormSchema),
        defaultValues: {
            chat_id: '', // Default value, will be updated after fetching

        }
    });

    const {
        data: chatInsight,
        isError: isChannelError,
        error: channelError,
    } = useFetchData(["chat-insights"], () => getWeeklyChatInsight());

    // Populate form fields with fetched data
    useEffect(() => {
        if (chatInsight) {
            form.reset(chatInsight);
        }
    }, [chatInsight, form]);
    const [chatOptions, setChatOptions] = useState<{ id: string, display_name: string }[]>([]);
    const [defaultChat, setDefaultChat] = useState<string | null>(null);

    const { data: chats, isError, error } = useFetchData(["chats"], () => getAllChats())

    useEffect(() => {
        if (isError) {
            console.log(error?.message)
        } else if (chats) {
            const fetchedChats = chats.chats; // Assuming your response structure
            setChatOptions(fetchedChats);
            if (fetchedChats.length > 0) {
                setDefaultChat(fetchedChats[0].id); // Set the default chat id
            }
        }
    }, [chats, isError, error]);

    useEffect(() => {
        if (defaultChat) {
            form.setValue("chat_id", defaultChat); // Update form default value
        }
    }, [defaultChat]);



    const handleSuccess = (data:any) => {
    toast.success(data.details)
    }

    const { mutate,isPending,isError:isPostError, error:postError } = usePost({
        handleSuccess,
        mutateFn: (data) => saveWeeklyInsightChat(data)
    })
    const onSubmit = (data: ChatSettingsFormType) => {
        // Do something with the data here
        mutate(data)

    }
    useEffect(()=>{
if(isPostError){
    toast.error(postError?.message)
}
    },[isError])

    return (
        <FormProvider {...form}>
            <form className='flex flex-col gap-10' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField<ChatSettingsFormType>
                    name="chat_id"
                    render={({ field }) => (
                        <Select
                            defaultSelectedKeys={[field.value]}
                            onChange={field.onChange}
                            isRequired
                            label="Chat"
                            variant="bordered"
                            placeholder="Select Chat"
                            className="w-full placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
                            classNames={{
                                label: " font-normal pb-4  font-normal font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
                                innerWrapper: "bg-transparent px-4 !",
                                trigger: "!border-[1px] !h-[3.5rem]",
                                listbox: "!bg-background",
                                listboxWrapper: "!bg-background !p-0",
                                selectorIcon: "text-grey-100"
                            }}
                            name="chat"
                            labelPlacement="outside"
                        >
                            {chatOptions.map((chat) => (
                                <SelectItem className="capitalize" key={chat.id} value={chat.id}>
                                    {chat.display_name}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                />

                <Controller
                    name="emails"
                    control={form.control}
                    render={({ field }) => (
                        <EmailTextarea value={field.value} onChange={field.onChange} />
                    )}
                />

                <div className='flex items-center gap-4'>
                <Button  type="submit" isLoading={isPending} isDisabled={isPending} color="primary" size="lg" variant='bordered' className='!bg-primary text-white text-lg '>
                        Save
                    </Button>
                    <Button type="reset" size="lg" variant='bordered' className='bg-transparent text-lg text-grey-100'>
                        Reset
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default WeeklyChatSettingsForm
