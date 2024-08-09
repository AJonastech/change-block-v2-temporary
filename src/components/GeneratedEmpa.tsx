"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import GeneratedEmpaSkeleton from "./skeletons/EmpaHistorySkeleton";
import { useFetchData } from "@/hooks/useFetchData";
import { getEmpaReports } from "@/actions/EmpaActions";
import { Button } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { trimSentence } from "@/lib/utils";

function EmpaOverview() {
  const {
    data: reports,
    isError,
    isLoading,
    error,
  } = useFetchData(["empa-reports"], () => getEmpaReports());

  if (error || isError) {
    return (
      <div className="flex justify-center flex-col gap-3 w-full items-center">
        <h2 className="!mb-0 heading-h2 font-semibold font-generalSans leading-[58.5px] text-G700 text-xl sm:text-2xl lg:text-3xl">
          An error occurred
        </h2>
        <span className="w-[90%] text-center max-w-[600px] text-G100 leading-[25.2px] font-normal font-satoshi text-base sm:text-lg lg:text-xl">
          Sorry, we couldn&apos;t fetch the reports. Please try again later.
        </span>
      </div>
    );
  }

  return (
    <main className="w-full min-h-full bg-white overflow-auto rounded-xl no-scrollbar flex flex-col gap-10 p-9 py-12">
      {(isLoading || reports.length !== 0) && (
        <div className="flex justify-between items-center">
          <h6 className="heading-h6 font-semibold font-generalSans text-grey-700 text-base sm:text-lg lg:text-xl">
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
      )}
      <div>
        {/* render this if there is no data */}
        {!isLoading && reports.length === 0 && (
          <div className="flex justify-center flex-col gap-3 w-full items-center">
            <h2 className="!mb-0 heading-h2 font-semibold font-generalSans leading-[58.5px] text-G700 text-xl sm:text-2xl lg:text-3xl">
              EMPA Generator
            </h2>
            <span className="w-[90%] text-center max-w-[600px] text-G100 leading-[25.2px] font-normal font-satoshi text-base sm:text-lg lg:text-xl">
              Hello! How can I assist you today? Whether it&apos;s data
              collection, analysis, or report generation for your EMPA, I&apos;m
              here to help. Just let me know what you need.
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
        )}
        <div className="grid-container justify-start items-stretch !gap-4 !space-y-0 !sm:gap-2 sm:justify-center">
          {isLoading
            ? // Display the loading skeleton
              Array.from({ length: 9 }).map((_, id) => (
                <GeneratedEmpaSkeleton key={id} />
              ))
            : reports?.map((report: Report, id: number) => {
         
                return (
                  <Link
                    key={id}
                    href={`/EMPA/introduction?data=report&&id=${report.report_id}&&status=${report.generation_status}`}
                    className="border-[1px] w-full border-grey/20 shadow-sm rounded-xl p-4 flex flex-col justify-start !no-underline items-start !gap-3 !space-y-0 bg-white hover:bg-G10/80 h-full"
                  >
                    <Image
                      src={"/assets/empa_history_1.png"}
                      alt="history"
                      width={300}
                      height={400}
                      className="w-full h-[233px] aspect-square object-cover object-left-top rounded-md"
                    />
                    <h6 className="heading-h6 capitalize font-generalSans font-semibold text-grey-500 leading-[28.6px] text-base sm:text-lg lg:text-xl">
                      {trimSentence(report.client_project_name, 30)}
                    </h6>
                    <div className="font-normal flex flex-wrap items-center gap-x-2 leading-[25.2px] text-grey-100 text-sm sm:text-base lg:text-lg">
                      <span className="capitalize">
                        {trimSentence(report.client_name, 15)}
                      </span>
                      <span className="bg-grey-50 inline-block w-[6px] h-[6px] aspect-square rounded-full"></span>
                      <span>Edited {formatDate(report.date_updated)}</span>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </main>
  );
}

export default EmpaOverview;

function formatDate(isoString: string): string {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true });
}
