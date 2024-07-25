import WeeklyChatSettingsForm from '@/components/forms/WeeklyChatSettingsForm'
import React from 'react'

function page() {
    return (
        <main className="w-full h-full bg-background  !min-w-full ">
            <div className="flex flex-col h-full !gap-12 bg-white p-6 pt-[3rem] rounded-xl">
                <div className="flex !space-y-0 !gap-2 h-fit justify-center   items-center text-center flex-col mx-auto  ">
                    <h2 className="  !mb-0 heading-h2 font-semibold font-generalSans leading-[58.5px] text-G700">Chat Settings</h2>
                    <span className=" w-[90%] max-w-[627px] text-G100 text-lg leading-[25.2px] font-normal font-satoshi">
                        Edit your chat room to get messages from
                    </span>
                </div>
                <div className=' w-full justify-center mt-5 pb-12  px-[2rem]'>
                    <WeeklyChatSettingsForm />
                </div>
            </div>

        </main>
    )
}

export default page