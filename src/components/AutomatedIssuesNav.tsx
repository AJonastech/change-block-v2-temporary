import { automatedIssuesItems } from '@/config/panelConfig'
import React from 'react'
import SlideIntoView from './SlideIntoView'
import Link from 'next/link'

function AutomatedIssuesNav() {
  return (
    <div className="w-full pb-[2rem] flex flex-col px-4 justify-between h-full overflow-x-hidden ">
      <h6 className=" heading-h6 text-grey-500 font-generalSans font-semibold mb-4 pb-3 mt-7 ">Actions</h6>
      <ul className="h-full flex flex-col px-1 not-prose">
        {automatedIssuesItems.map((item, index) => (
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
      <div className="border-[1px] cursor-pointer text-red-500 px-4 py-3 text-center border-[#C1C2C0]/50 rounded-2xl">
                Clear Cache
            </div>
    </div>
  )
}

export default AutomatedIssuesNav