"use client"
import { Checkbox, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { formatDistanceToNow } from 'date-fns';

function EMPAQuestions() {
    const [questions, setQuestions] = useState([
        { id: 1, text: 'Type your question here...', created: new Date() }
    ]);

    const addQuestion = () => {
        const newQuestion = {
            id: questions.length + 1,
            text: 'Type your question here...',
            created: new Date()
        };
        setQuestions([...questions, newQuestion]);
    };

    return (
        <div className='grid grid-cols-2 gap-4'>
            <div
                className='h-[219px] flex cursor-pointer flex-col gap-3 items-center justify-center border-[1px] border-[#C1C2C0]/50 border-dashed rounded-2xl bg-white'
                onClick={addQuestion}
            >
                <span className='w-[44px] inline-flex items-center justify-center bg-primary text-white rounded-full h-[44px]'>
                    <BiPlus size={34} strokeWidth={0.5} />
                </span>
                <h6 className='font-generalSans heading-h6 font-semibold leading-[28.6px] text-grey-500'>Add Question</h6>
            </div>
            {questions.map((question, index) => (
                <div key={index} className='h-full flex flex-col justify-between border-[1px] border-[#C1C2C0]/30 rounded-2xl p-4'>
                    <div className='flex flex-col gap-3'>
                        <div>
                            <Checkbox><span className='text-grey-700 font-satoshi text-lg leading-[25.2px] font-semibold'>Question {question.id}</span></Checkbox>
                        </div>
                        <Textarea classNames={{
                            base: "bg-transparent",
                            mainWrapper: "bg-transparent shadow-none",
                            inputWrapper: "bg-transparent shadow-none",
                            innerWrapper: "bg-transparent shadow-none",
                            input: "bg-transparent font-satoshi text-[15px] text-grey-500 shadow-none placeholder:italic placeholder:text-[15px] placeholder:font-satoshi placeholder:text-grey-100 placeholder:leading-[21px]",
                            helperWrapper: "helper-wrapper-classes shadow-none"
                        }} placeholder={question.text} />
                    </div>
                    <p>
                        <small className='text-[15px] font-satoshi  text-grey-300 leading-[21px] '>Created {formatDistanceToNow(new Date(question.created), { addSuffix: true })}</small>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default EMPAQuestions;
