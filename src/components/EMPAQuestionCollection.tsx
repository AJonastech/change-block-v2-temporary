"use client";

import { Checkbox, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { formatDistanceToNow, isToday, parseISO } from "date-fns";
import { questions as EMPAQuestions } from "@/mockdata/questions";
import { groupQuestionsByDate } from "@/lib/groupQuestionsByDate";
import Link from "next/link";
import { TQuestion } from "@/types/questions";

function EMPAQuestionsCollection() {
    const [questions, setQuestions] = useState<TQuestion[]>([
        ...EMPAQuestions,
        {
            id: EMPAQuestions.length + 1,
            text: "",
            created: new Date().toISOString(),
            source: "/EMPA/methodology?data=report&&section=Data Gathering",
        }, // Default question for today
    ]);

    const addQuestion = () => {
        const newQuestion: TQuestion = {
            id: questions.length + 1,
            text: "Type your question here...",
            created: new Date().toISOString(),
            source: "/EMPA/methodology?data=report&&section=Data Gathering",
        };
        setQuestions([...questions, newQuestion]);
    };

    const groupedQuestions = groupQuestionsByDate(questions);

    return (
        <div className="flex flex-col gap-8">
            {Object.entries(groupedQuestions).map(
                ([dateLabel, { label, questions }], index) => {
                    const parsedDate = parseISO(questions[0].created); // Parse the date from the first question in the group
                    const isTodayDate = isToday(parsedDate);

                    return (
                        <div key={index}>
                            <div className="relative flex items-center justify-center mb-8">
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                >
                                    <div className="w-full border-t-[1px] border-[#C1C2C0]/50" />
                                </div>
                                <div className="relative flex bg-white px-3 z-50 justify-center text-grey-700 font-semibold heading-h6 ">
                                    {label}
                                </div>
                            </div>
                            <div className="grid auto-rows-fr grid-cols-2 gap-4">
                                {/* {isTodayDate && (
                                    <div
                                        className="h-[219px] flex cursor-pointer flex-col gap-3 items-center justify-center border-[1px] border-[#C1C2C0]/50 border-dashed rounded-2xl bg-white"
                                        onClick={addQuestion}
                                    >
                                        <span className="w-[44px] inline-flex items-center justify-center bg-primary text-white rounded-full h-[44px]">
                                            <BiPlus size={34} strokeWidth={0.5} />
                                        </span>
                                        <h6 className="font-generalSans heading-h6 font-semibold leading-[28.6px] text-grey-500">
                                            Add Question
                                        </h6>
                                    </div>
                                )} */}
                                {questions.map((question) => (
                                    <Link
                                        href={question.source}
                                        key={question.id}
                                        className="h-full min-h-[216px] flex flex-col justify-between bg-grey-10 border-[1px] border-[#C1C2C0]/30 rounded-2xl p-4"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <Checkbox>
                                                    <span className="text-grey-700 font-satoshi text-lg leading-[25.2px] font-semibold">
                                                        Question {question.id}
                                                    </span>
                                                </Checkbox>
                                            </div>
                                            <Textarea
                                                disabled
                                                defaultValue={question.text}
                                                classNames={{
                                                    base: "bg-transparent ",
                                                    mainWrapper: "bg-transparent  shadow-none",
                                                    inputWrapper: "bg-transparent  shadow-none",
                                                    innerWrapper: "bg-transparent  shadow-none",
                                                    input:
                                                        "bg-transparent  font-satoshi text-[15px] text-grey-500 shadow-none placeholder:italic placeholder:text-[15px] placeholder:font-satoshi placeholder:text-grey-100 placeholder:leading-[21px]",
                                                    helperWrapper: "helper-wrapper-classes shadow-none",
                                                }}
                                                placeholder={
                                                    question.text || "Type your question here..."
                                                }
                                            />
                                        </div>
                                        <div className="text-lg font-normal flex items-center gap-x-2 leading-[25.2px] text-grey-100">
                                            <small className="text-[15px] font-satoshi text-grey-300 leading-[21px]">
                                                Created{" "}
                                                {formatDistanceToNow(new Date(question.created), {
                                                    addSuffix: true,
                                                })}
                                            </small>
                                            {
                                                question.section && (
                                                    <>
                                                        <span className="bg-grey-50 inline-block w-[6px] h-[6px] aspect-square rounded-full"></span>
                                                        <span className="text-[15px] font-satoshi text-grey-300 leading-[21px] font-medium" >{question.section}</span></>
                                                )
                                            }
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                }
            )}
        </div>
    );
}

export default EMPAQuestionsCollection;