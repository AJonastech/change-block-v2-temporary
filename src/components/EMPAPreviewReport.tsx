import React, { useRef } from 'react';
import Markdown from './Markdown';
import { Button } from '@nextui-org/react';
import html2pdf from 'html2pdf.js';
import { DownloadIcon } from '@/icons';

interface EMPAPreviewReportProps {
  htmlContent: string;
  filename: string;
}

const EMPAPreviewReport: React.FC<EMPAPreviewReportProps> = ({ htmlContent, filename }) => {
  const reportRef = useRef(null);

  const handleDownloadPDF = () => {
    const element = reportRef.current;
    if (element) {
      const opt = {
        margin: 0.5,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save();
    }
  };

  return (
    <div className='w-full h-full bg-white flex flex-col'>
      <div className='flex border-b-[1px] px-9 border-[#C1C2C0]/50 py-6 justify-between items-center w-full   bg-white z-10'>
        <h6 className='heading-h6 text-grey-700 font-generalSans font-semibold'>
          EMPA Report
        </h6>
        <Button endContent={<DownloadIcon />} onClick={handleDownloadPDF} color="primary" className='!bg-primary mr-[50px] !py-[5px] !px-4'>
          Download Report
        </Button>
      </div>
      <div className='flex-1 overflow-y-auto px-9' ref={reportRef}>
        <Markdown>{htmlContent}</Markdown>
      </div>
    </div>
  );
}

export default EMPAPreviewReport;
