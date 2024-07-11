import AppsBadge from '@/components/AppsBadge'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full">
            <AppsBadge />
            <div className=" w-full h-full mt-7 !max-h-full overflow-y-auto   flex">



            <div className="w-full h-full overflow-auto  bg-white p-6 py-[3rem] rounded-xl">{children} </div>
            </div>
        </div>
    )
}

export default layout