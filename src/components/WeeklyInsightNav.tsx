import { weeklyInsightItems } from '@/config/panelConfig'
import React from 'react'
import SlideIntoView from './SlideIntoView'
import Link from 'next/link'

function WeeklyInsightsNav() {
    return (
        <div className="w-full px-3  pb-[2rem] flex flex-col h-full overflow-x-hidden ">
            <div className='flex-1'>
                <h6 className=" heading-h6 text-grey-500 font-generalSans font-semibold mb-4 pb-3 px-4 mt-7 ">Actions</h6>
                <ul className="h-full flex flex-col  not-prose">
                    {weeklyInsightItems.map((item, index) => (
                        <li key={index} className="mb-2 ">

                            <SlideIntoView from="left" index={index}>
                                <Link
                                    href={item.path}
                                    className={`w-full  rounded-full  flex items-center px-[1rem] py-2 justify-start gap-2 bg-transparent hover text-lg capitalize ${item.name === "Home"
                                        ? "text-grey-700 font-satoshi font-medium"
                                        : "text-grey-300 font-light"
                                        } hover:bg-gray-300/20`}
                                >
                                    <span className=" "> {<item.icon />}</span>
                                    <span className="pl-2"> {item.name}</span>
                                </Link>
                            </SlideIntoView>


                        </li>
                    ))}
                </ul>
            </div>
            <div className="border-[1px] text-red-500 px-4 py-3 text-center border-[#C1C2C0]/50 rounded-2xl">
                Clear Cache
            </div>
        </div>
    )
}

export default WeeklyInsightsNav