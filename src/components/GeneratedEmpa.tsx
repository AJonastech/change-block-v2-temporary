"use client";
import React, { useEffect, useState } from 'react';
import { reports } from '@/mockdata/empaReportsHistory';
import Link from 'next/link';
import Image from 'next/image';
import GeneratedEmpaSkeleton from './skeletons/EmpaHistorySkeleton';
import { useFetchData } from '@/hooks/useFetchData';
import { getEmpaReports } from '@/actions/EmpaActions';

function GeneratedEmpa() {
    const [loading, setLoading] = useState(true);


    const { data: reportsD } = useFetchData(["empa-reports"], () => getEmpaReports());
    console.log(reportsD)
    useEffect(() => {
        const fetchReports = async () => {
            try {

                const response = await fetch(`${process.env.BACKEND_URL}/api/empa/reports`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer .eJwNyt0OgiAYANB38QHcQPvxkpHTjwJbqYl3Sk5ByVYtJ09f5_p43cqGNlE60wwKB0hoeMPjslEUtjA-q5KyyP8npHC5VngawcxaGImFhVDk94G7PhQHMUkzoiwpFp4zy6103JVDfeP6RNnUpURnJg64gQ3P5SJcHfmENK82nNG5H5cYp-T4xQXNyWcOtG6VuTIbK1s3-52JvR9QTTeb.6j48mg0HadBMGhMWreuL2P0u33w` },
                    }
                )
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                console.log(data, "This is me")
                return data
            } catch (error) {
                console.error(`Error during getEmpaReports:`, error);
            }
        }
        fetchReports()
    }, []);

    return (
        <div>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 justify-start items-stretch !gap-4 !space-y-0 !sm:gap-2 sm:justify-center">
                {loading ? (
                    // Display the loading skeleton
                    Array.from({ length: 9 }).map((_, id) => (
                        <GeneratedEmpaSkeleton key={id} />
                    ))
                ) : (
                    // Display the report items
                    reports.map((report, id) => (
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
    );
}

export default GeneratedEmpa;
