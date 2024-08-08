"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { ReactNode } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import { Trash } from "iconsax-react";
import SubmitButton from "../SubmitButton";
import useReportStepsStore from "@/store/useReportStepsStore";
import usePost from "@/hooks/usePostData";
import { deleteEmpa } from "@/actions/EmpaActions";

const ConfirmDeleteModal = ({
  data,
  collection,
  reportId,
  children,
}: {
  data: any;
  collection?: string;
  reportId:string;
  children?: ReactNode;
}) => {
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onOpenChange: onConfirmOpenChange,
    onClose: onConfirmClose,
  } = useDisclosure();
  const { currentSubStep, deleteSubStep, reportSteps } = useReportStepsStore();
  const router = useRouter(); // Initialize the router
  const { segment } = useParams();
  const decodedSegment = decodeURIComponent(segment as string);

  const handleDeleteDoccument = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      if (currentSubStep) {
        const stepIndex = reportSteps.findIndex((step) =>
          step.substeps.some(
            (substep) => substep.title === currentSubStep.title
          )
        );

        if (stepIndex !== -1) {
          deleteSubStep(stepIndex, data);

          // Navigate to the next item
          const nextStepIndex = stepIndex % reportSteps.length;
          const nextSubStep = reportSteps[nextStepIndex].substeps[1];
          console.log({ nextSubStep });
          if (nextSubStep) {
            const nextPath = `/EMPA/${decodedSegment}?data=report&&section=${encodeURIComponent(
              nextSubStep.title
            )}`;
            router.push(nextPath);
          } else {
            // Navigate to the next item
            const nextStepIndex = stepIndex + (1 % reportSteps.length);
            const nextSubStep = reportSteps[nextStepIndex].substeps[0];
            const nextPath = `/EMPA/${
              reportSteps[nextStepIndex].title
            }?data=report&&section=${encodeURIComponent(nextSubStep.title)}`;
            router.push(nextPath); // Fallback route
          }

          
        }
      }
      await mutate(reportId)
      onConfirmClose();
      router.push(`/EMPA`);
    } catch (error) {
      console.log(error)
      onConfirmClose();
    }
  };

  const {mutate,  error, isSuccess, isError} = usePost({
    handleSuccess: () => {},
    mutateFn: (data: any) => deleteEmpa(data),
  })



  return (
    <div className="flex  justify-between items-center  h-full my-auto  ">
      <div className="w-full">
        {" "}
        <Button
          isIconOnly
          variant="light"
          onPress={onConfirmOpen}
          color="danger"
          className="w-full rounded-none"
        >
          {children ? children : <Trash />}
        </Button>
        <Modal isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Confirm Delete
                </ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to delete this?</p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>

                  <form
                    action={handleDeleteDoccument}
                    className="bg-red-600 rounded-md"
                  >
                    <SubmitButton color="danger">Delete</SubmitButton>
                  </form>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
