import EMPAInitiationForm from "@/components/EMPAInitiationForm";
import React from "react";

const page = () => {
  return (
  <div className="w-full h-full  flex flex-col gap-10 bg-white rounded-3xl p-8 pt-12 overflow-y-auto  !min-w-full no-scrollbar" >
     <div className="flex !space-y-0 !gap-2 h-fit justify-center   items-center text-center flex-col mx-auto  ">
        <h2 className="  !mb-0 heading-h2 font-semibold font-generalSans leading-[58.5px] text-G700">EMPA Generator</h2>
        <span className=" w-[90%] max-w-[627px] text-G100 text-lg leading-[25.2px] font-normal font-satoshi">
          Hello! How can I assist you today? Whether it&apos;s data collection,
          analysis, or report generation for your EMPA, I&apos;m here to help.
          Just let me know what you need.
        </span>
      </div>
    <EMPAInitiationForm />
  </div>


  )
};

export default page;
