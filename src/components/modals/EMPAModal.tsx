"use client";
import React, { ReactElement, ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function EMPAModal({
  children,
  buttonTitle,
  buttonElement,
  buttonIcon,
  className,
}: {
  children: ReactElement;
  buttonTitle?: string;
  className?: string;
  buttonElement?: ReactElement;
  buttonIcon?: ReactElement;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const buttonProps = {
    onPress: onOpen,
  };

  return (
    <>
      {buttonElement ? (
        React.cloneElement(buttonElement, buttonProps)
      ) : (
        <Button
          variant="light"
          onPress={onOpen}
          className="w-fit rounded-none"
          isIconOnly={buttonIcon ? true : false}
        >
          {buttonIcon || buttonTitle || "open"}
        </Button>
      )}
      <Modal
        classNames={{
          closeButton:
            "mt-4 mx-8 bg-grey-20 hover:border-red-500 border border-transparent w-[44px] h-[44px] flex items-center justify-center text-center",
        }}
        size={undefined}
        className={`${className} max-h-[90vh] overflow-y-auto rounded-[32px]
`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full">
          {(onClose) => (
            <ModalBody className=" p-0  ">
              {React.cloneElement(children, { onClose })}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
