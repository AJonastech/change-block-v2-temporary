import React from 'react';
import { Button } from '@nextui-org/react';

interface EMPAPreviewConfirmationProps {
  onPreview: (type: 'current' | 'entire') => void;
}

const EMPAPreviewConfirmation: React.FC<EMPAPreviewConfirmationProps> = ({ onPreview }) => {
  return (
    <div className="bg-gradient-to-b p-6 from-lemon-50 to-white">
      <div className="flex items-center justify-center bg-gradient-to-b from-lemon-50 to-white">
        <div className="p-6 rounded-lg flex flex-col gap-5 text-center">
          <h4 className="heading-h4 font-generalSans font-bold text-grey-700 mb-2">
            Preview Your EMPA Report
          </h4>
          <p className="text-grey-100 w-[550px] font-satoshi text-lg leading-[24px] font-light">
            Would you like to preview the current section or the entire EMPA report? Choose your preferred option to ensure everything looks perfect before finalizing.
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="!bg-primary !py-6 !px-6 text-grey-20 text-lg font-medium" onClick={() => onPreview('current')}>
              Current Section
            </Button>
            <Button className="!bg-green-300 !py-6 !px-6 text-grey-20 text-lg font-medium" onClick={() => onPreview('entire')}>
              Entire Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMPAPreviewConfirmation;
