import React from "react";
import APPS from "../constants";
import Image from "next/image";
import Link from "next/link";
import SlideIntoView from "./SlideIntoView";

function Home() {
  console.log({ APPS });

  return (
    <div className="flex flex-col h-full !gap-8 bg-white pt-[3rem] rounded-xl">
      <div className="flex !space-y-0 !gap-2 h-fit justify-center items-center text-center flex-col mx-auto max-w-[627px] ">
        <h1 className="  !mb-0">What Can I do For You Today?</h1>
        <span className=" max-w-[80%]">
          Hello! How can I assist you today? Whether it&apos;s data collection,
          analysis, or report generation for your EMPA, I&apos;m here to help.
          Just let me know what you need.
        </span>
      </div>
      <div className="overflow-y-auto h-full px-[2rem]">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3  justify-start items-stretch !gap-4 !space-y-0   !sm:gap-2 sm:justify-center">
          {APPS?.map((a, index) => (
            <SlideIntoView key={index} index={index}>
              <Link
                href={`#`}
                className="  border-[1px]  border-grey/20 shadow-sm rounded-xl p-4  flex flex-col justify-start !no-underline items-start !gap-3 !space-y-0 bg-[#FAFAFA] hover:bg-[#FAFAFA]/10 h-full "
              >
                <div
                  className={`
                        w-[50px] h-[50px] rounded-md sm:h-[40px] sm:w-[40px]
                        ${index === 0 && "bg-[#D1E7FA] p-[1px]"}
                        ${index === 1 && "bg-[#FCEFCF] p-[1px]"}
                        ${index === 2 && "bg-[#F7D4E2] p-[1px]"}
                        ${index === 3 && "bg-[#CCE7FF] p-[1px]"}
                        ${index === 4 && "bg-[#DDD2F9] p-[1px]"}
                        ${index === 5 && "bg-[#E4CCFF] p-[1px]"}
                        ${index === 6 && "bg-[#DCDFEF] p-[1px]"}
                   
                        
                    `}
                >
                  <Image
                    src={a.img}
                    className={`w-full h-full -translate-y-[90%] ${
                      index == 5 ? "object-fill scale-90" : "object-cover"
                    }`}
                    alt={a.name}
                    height={200}
                    width={200}
                  />
                </div>
                <h3 className=" !my-0">{a.name}</h3>
                <span className=" !font-normal text-dark-200 ">{a.desc}</span>
              </Link>
            </SlideIntoView>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
