"use client";

import "react-toastify/dist/ReactToastify.css";

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

import SubmitButton from "@/components/SubmitButton";
import { useFormStatus } from "react-dom";

const EMPAGeneratorLoadingModal = ({ valid }: { valid: boolean }) => {
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onOpenChange: onConfirmOpenChange,
    onClose: onConfirmClose,
  } = useDisclosure();
  const { pending } = useFormStatus();

  return (
    <div className="flex  justify-between items-center  h-full my-auto w-fit ">
      {" "}
      <SubmitButton
        onPress={() => {
          onConfirmOpen();
        }}
      >
        Generate EMPA
      </SubmitButton>
      <Modal isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className=" bg-gradient-to-b from-secondary to-white">
                <div className="flex items-center justify-center  bg-gradient-to-b from-secondary to-white">
                  <div className=" p-6 rounded-lg  text-center max-w-md">
                    <div className="flex justify-center mb-4">
                      <span className="animate-spin h-8 w-[2rem] border-s-green-500 border-t-green-500 rounded-full border-4 flex text-green-500"></span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Generating Your EMPA Report
                    </h2>
                    <p className="text-gray-600">
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
