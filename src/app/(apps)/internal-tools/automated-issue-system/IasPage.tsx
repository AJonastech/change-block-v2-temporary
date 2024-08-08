"use client"
import React from 'react'
import { Button } from '@nextui-org/react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { sweepChannelMessages } from '@/actions/IasActions';
import usePost from '@/hooks/usePostData';
function IasPage() {
    const router = useRouter()
    const handleSuccess = () => {
   
       
    }

    const { mutate: sweepChannel, error, isPending: isSweepingChannel, isSuccess, isError } = usePost({ handleSuccess, mutateFn: () => sweepChannelMessages() });

    if (isError) {
   
        console.log(error, "The error occured here");
    }

    const handleChannelSweep = async () => {
        await sweepChannel({})
    }

    return (
        <main className="w-full h-full bg-background  !min-w-full ">
            <div className="flex flex-col h-full !gap-12 bg-white ">
                <div className="flex !space-y-0 !gap-2 h-fit justify-center   items-center text-center flex-col mx-auto  ">
                    <h2 className="  !mb-0 heading-h2 font-semibold font-generalSans leading-[58.5px] text-G700">Issues System</h2>
                    <span className=" w-[90%] max-w-[627px] text-G100 text-lg leading-[25.2px] font-normal font-satoshi">
                        Click the buttons below to create issues from Jira. Note, loading may take a while please be patient
                    </span>
                </div>
                <div className='flex justify-center mt-10 gap-4 px-[2rem]'>
                    <div className='bg-grey-10 max-w-[421px] border-[1px] border-[#C1C2C0]/30 p-4 rounded-xl'>
                        <h6 className='heading-h6 max-w-[300px] mb-2 text-grey-500 font-generalSans font-semibold leading-[28.6px]'>
                            Sweep and Create Issues
                            from Channel
                        </h6>
                        <p className='font-satoshi mb-6 text-grey-100 text-[15px] leading-[21px]  '>
                            Effortlessly distill key insights from team meetings, saving time and ensuring everyone stays informed.
                        </p>
                        <Button isLoading={isSweepingChannel} onClick={handleChannelSweep} className='w-full font-satoshi text-grey-20 !bg-primary ' color='primary'>
                            Process
                        </Button>
                    </div>
                    <div className='bg-grey-10 max-w-[421px] border-[1px] border-[#C1C2C0]/30 p-4 rounded-xl'>
                        <h6 className='heading-h6 mb-2 max-w-[300px] text-grey-500 font-generalSans font-semibold leading-[28.6px]'>
                            Sweep and Create Issues
                            from Chat
                        </h6>
                        <p className='font-satoshi mb-6 text-grey-100 text-[15px] leading-[21px]  '>
                            Effortlessly curate and create engaging newsletters with our intuitive newsletter generator tool.
                        </p>
                        <Button className='w-full font-satoshi text-grey-20 !bg-primary ' color='primary'>
                            Process
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default IasPage