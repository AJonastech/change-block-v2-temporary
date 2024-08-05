"use client";
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import GeneratedEmpaSkeleton from './skeletons/EmpaHistorySkeleton';
import { useFetchData } from '@/hooks/useFetchData';
import { getEmpaReports } from '@/actions/EmpaActions';
import { Report } from '@/types/empaReportsHistory';
import { Button } from '@nextui-org/react';

function EmpaOverview() {

    const token = ".eJwNyt0OgiAYANB38QHcQPvxkpHTjwJbqYl3Sk5ByVYtJ09f5_p43cqGNlE60wwKB0hoeMPjslEUtjA-q5KyyP8npHC5VngawcxaGImFhVDk94G7PhQHMUkzoiwpFp4zy6103JVDfeP6RNnUpURnJg64gQ3P5SJcHfmENK82nNG5H5cYp-T4xQXNyWcOtG6VuTIbK1s3-52JvR9QTTeb.6j48mg0HadBMGhMWreuL2P0u33w"

    const { data: reports, isLoading, error } = useFetchData(["empa-reports"], () => getEmpaReports());



    if (error) {
        console.log(error, "This is the error")
    }

    return (
        <main className="w-full min-h-full bg-white overflow-auto rounded-xl no-scrollbar flex flex-col gap-10  p-9 py-12   ">
            {
                (isLoading || reports.length !==0) && (
                    <div className="flex justify-between items-center">
                        <h6 className="heading-h6 font-semibold font-generalSans text-grey-700">
                            EMPA Generator
                        </h6>
                        <Button
                            as={Link}
                            href="/EMPA/generate"
                            aria-label="Generate EMPA"
                            size="lg"
                            className="font-medium text-grey-20 px-6 py-4 lg:text-lg bg-primary"
                            color="primary"
                        >
                            Generate EMPA
                        </Button>
                    </div>
                )
            }
            <div>
                {/* render this if there is no data */}
                {
                    !isLoading && reports.length === 0 && (
                        <div className='flex justify-center flex-col gap-3 w-full items-center'>
                            <h2 className="  !mb-0 heading-h2 font-semibold font-generalSans leading-[58.5px] text-G700">EMPA Generator</h2>
                            <span className=" w-[90%] text-center max-w-[600px] text-G100 text-lg leading-[25.2px] font-normal font-satoshi">
                                Hello! How can I assist you today? Whether it's data collection, analysis, or report generation for your EMPA, I'm here to help. Just let me know what you need.
                            </span>
                            <Button
                                as={Link}
                                href="/EMPA/generate"
                                aria-label="Generate EMPA"
                                size="lg"
                                className="font-medium text-grey-20 px-6 py-4 lg:text-lg bg-primary"
                                color="primary"
                            >
                                Generate EMPA
                            </Button>
                        </div>
                    )
                }
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 justify-start items-stretch !gap-4 !space-y-0 !sm:gap-2 sm:justify-center">
                    {isLoading ? (
                        // Display the loading skeleton
                        Array.from({ length: 9 }).map((_, id) => (
                            <GeneratedEmpaSkeleton key={id} />
                        ))
                    ) : (
                        reports.map((report: Report, id: number) => (
                            <Link
                                key={id}
                                href={`/EMPA/home?data=report`}
                                className="border-[1px] w-full border-grey/20 shadow-sm rounded-xl p-4 flex flex-col justify-start !no-underline items-start !gap-3 !space-y-0 bg-white hover:bg-G10/80 h-full"
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
                                <div className="text-lg font-normal flex items-center gap-x-2 leading-[25.2px] text-grey-100">
                                    <span>{report.role}</span>
                                    <span className="bg-grey-50 inline-block w-[6px] h-[6px] aspect-square rounded-full"></span>
                                    <span>Edited {report.lastEdited}</span>
                                </div>
                            </Link>

                        ))
                    )}
                </div>
            </div>
        </main>

    );
}

export default EmpaOverview;
