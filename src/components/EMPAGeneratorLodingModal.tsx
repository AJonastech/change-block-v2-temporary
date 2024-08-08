"use client";

import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

import SubmitButton from "@/components/SubmitButton";


const EMPAGeneratorLoadingModal = ({ valid }: { valid: boolean }) => {
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onOpenChange: onConfirmOpenChange,
    onClose: onConfirmClose,
  } = useDisclosure();


  return (
    <div className="flex  justify-between items-center  h-full my-auto">
      {" "}
      <Button
        type="submit"
        onClick={() => {
          valid && onConfirmOpen();
        }}
        color="primary"
        className="rounded-xl !bg-primary"
        size="lg"

      >
        Generate EMPA
      </Button>
      <Modal size="xl" isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className=" bg-gradient-to-b from-secondary  to-white">
                <div className="flex items-center justify-center  bg-gradient-to-b from-secondary to-white">
                  <div className=" p-6 rounded-lg  text-center ">
                    <div className="flex justify-center mb-4">
                      <span className="animate-spin w-10 h-10 aspect-square border-s-primary border-t-primary rounded-full border-4 flex text-primary"></span>
                    </div>
                    <h4 className="heading-h4 font-generalSans font-bold text-grey-700 mb-2">
                      Generating Your EMPA Report
                    </h4>
                    <p className="text-grey-100 font-satoshi text-lg font-light">
                      Thank you for submitting your details, please wait a
                      moment while we gather and process the necessary data to
                      provide you with an accurate and robust assessment. Your
                      EMPA report will be ready shortly.
                    </p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EMPAGeneratorLoadingModal;
