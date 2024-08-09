"use client"
import { generateWeeklyChannelInsight, generateWeeklyChatInsight } from '@/actions/IasActions';
import usePost from '@/hooks/usePostData';
import { Button } from '@nextui-org/react'
import React from 'react'
import { toast } from 'react-toastify';

function WeeklyInsightsPage() {

    const handleChannelSuccess = (data:any) => {
   
       toast.success(data.details)
    }

    const { mutate: generateChannelInsight, error, isPending: isChannelPending, isSuccess, isError } = usePost({ handleSuccess:handleChannelSuccess, mutateFn: () => generateWeeklyChannelInsight() });

    if (isError) {
   
        console.log(error, "The error occured here");
    }

    const handleChannelSweep = async () => {
        await generateChannelInsight({})
    }

    const handleChatSuccess = (data:any) => {
   
        toast.success(data.details)
     }
 
     const { mutate: generateChatInsight, isPending: isChatPending } = usePost({ handleSuccess:handleChannelSuccess, mutateFn: () => generateWeeklyChatInsight() });
 
     if (isError) {
    
         console.log(error, "The error occured here");
     }
 
     const handleChatSweep = async () => {
         await generateChatInsight({})
     }
    return (
        <main className="w-full h-full bg-background  !min-w-full ">
            <div className="flex flex-col h-full !gap-12 bg-white ">
                <div className="flex !space-y-0 !gap-2 h-fit justify-center   items-center text-center flex-col mx-auto  ">
                    <h2 className="  !mb-0 heading-h2 font-semibold font-generalSans leading-[58.5px] text-G700">Weekly Insights System</h2>
                    <span className=" w-[90%] max-w-[627px] text-G100 text-lg leading-[25.2px] font-normal font-satoshi">
                        Click the buttons below to process insights from your team channels. Note: This process may take a while, so please be patient
                    </span>
                </div>
                <div className='flex justify-center mt-10 gap-4 px-[2rem]'>
                    <div className='bg-grey-10 max-w-[421px] border-[1px] border-[#C1C2C0]/30 p-4 rounded-xl'>
                        <h6 className='heading-h6 mb-2 text-grey-500 font-generalSans font-semibold leading-[28.6px]'>
                            Generate Insights from Team Meetings
                        </h6>
                        <p className='font-satoshi mb-6 text-grey-100 text-[15px] leading-[21px]  '>
                            Automatically gather key insights from your team channels, saving time and ensuring everyone stays informed.
                        </p>
                        <Button onClick={handleChannelSweep}  isLoading={isChannelPending} isDisabled={isChannelPending} className='w-full font-satoshi !bg-primary text-grey-20 ' color='primary'>
                          {isChannelPending ? "Processing...":"Process"}
                        </Button>
                    </div>
                    <div className='bg-grey-10 max-w-[421px] border-[1px] border-[#C1C2C0]/30 p-4 rounded-xl'>
                        <h6 className='heading-h6 mb-2 text-grey-500 font-generalSans font-semibold leading-[28.6px]'>
                            Generate Insights from Project Discussions
                        </h6>
                        <p className='font-satoshi mb-6 text-grey-100 text-[15px] leading-[21px]  '>
                            Effortlessly distill key insights from team meetings, saving time and ensuring everyone stays informed.
                        </p>
                        <Button onClick={handleChatSweep} className='w-full font-satoshi !bg-primary text-grey-20 ' color='primary'>
                            Process
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default WeeklyInsightsPage