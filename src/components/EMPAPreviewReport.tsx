import React from 'react'
import Markdown from './Markdown'
import { parseMKD } from '@/config/parseMKD'
import { markdownContent } from '@/mockdata/EMPASectionsMKD'
import { EMPAReportSteps } from '@/config/reportStepConfig'
function EMPAPreviewReport() {
    const htmlContent = parseMKD(concatenateMarkdown(EMPAReportSteps))

  return (
    <div className='w-full h-full px-9 bg-white '>
  <Markdown>{htmlContent}</Markdown>
    </div>
  )
}

export default EMPAPreviewReport

const concatenateMarkdown = (steps:TStep[]) => {
    return steps.reduce((acc, step) => {
      const stepMarkdown = step.substeps.reduce((subAcc, subStep) => {
        if (subStep.data) {
          return subAcc + subStep.data + "\n\n";
        }
        return subAcc;
      }, "");
      return acc + stepMarkdown;
    }, "");
  };