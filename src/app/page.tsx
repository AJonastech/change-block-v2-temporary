import SlideIntoView from "@/components/SlideIntoView";
import { reports } from "@/mockdata/empaReportsHistory";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function page() {
    return (
        <main className="w-full min-h-full  flex flex-col gap-10 bg-white rounded-3xl p-8 py-12  !min-w-full ">
            <div className="flex justify-between items-center">
                <h6 className="heading-h6 font-semibold font-generalSans text-grey-700">
                    EMPA Generator
                </h6>
                <Link   href="/EMPA-generator" >
              
                <Button size="lg" className="font-medium text-grey-20 px-6 py-4 lg:text-lg" color="primary">
                    Generate EMPA
                </Button>
                </Link>
             
            </div>
            <div className="overflow-y-auto h-full no-scrollbar">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3   justify-start items-stretch !gap-4 !space-y-0   !sm:gap-2 sm:justify-center">
                {
                    reports.map((report, id) => (
                        <SlideIntoView key={id} index={id}>
                        <Link
                          href={`/EMPA-generator/home?data=report`}
                          className="  border-[1px] w-full border-grey/20 shadow-sm rounded-xl p-4  flex flex-col justify-start !no-underline items-start !gap-3 !space-y-0 bg-white hover:bg-G10/80 h-full "
                        >
                         <Image
                          src={report.image}
                          alt=""
                          width={300}
                          height={400}
                          className="w-full h-[233px] aspect-square object-cover object-left-top rounded-md"
                         />
                         <h6 className="heading-h6 font-generalSans font-semibold text-grey-500 leading-[28.6px]">
                           {report.title}
                         </h6>
                         <div className="text-lg  font-normal flex items-center gap-x-2  leading-[25.2px] text-grey-100">
                             <span>
                                {report.role}
                             </span>
                             {" "}
                             <span className="bg-grey-50 inline-block w-[6px] h-[6px] aspect-square rounded-full">
                            
                                </span>
                           
                             {" "}
                                <span>
                               Edited     {report.lastEdited}
                                    </span>
                         </div>
                         
                        </Link>
                      </SlideIntoView>
                    ))
                }
            </div>
            </div>
        </main>
    );
}
