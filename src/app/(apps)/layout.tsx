import AppsBadge from '@/components/AppsBadge'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col gap-7 h-full">
            <AppsBadge />
            <div className=" w-full h-full   flex-grow rounded-xl !max-h-full overflow-y-auto   flex">

            <div className="w-full  overflow-x-hidden  no-scrollbar overflow-auto bg-white  px-6 py-[3rem] rounded-xl ">{children} </div>
            </div>
        </div>
    )
}

export default layout