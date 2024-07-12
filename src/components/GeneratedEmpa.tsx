"use client";
import React, { useEffect, useState } from 'react';
import { reports } from '@/mockdata/empaReportsHistory';
import Link from 'next/link';
import Image from 'next/image';
import GeneratedEmpaSkeleton from './skeletons/EmpaHistorySkeleton';

function GeneratedEmpa() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
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
                            href={`/EMPA-generator/home?data=report`}
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
