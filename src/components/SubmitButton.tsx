"use client";
// Assuming your TypeScript environment is configured properly

import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

// Define additional props for SubmitButton
interface SubmitButtonProps extends ButtonProps {
  // Add any additional props specific to SubmitButton
  //  loadingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-fit max-w-[150px] flex items-center "
      color="primary"
      radius="sm"
      isLoading={pending}
      {...props} // Spread the additional props
    >
      {pending ? "processing" : props.children || "submit"}
    </Button>
  );
};

export default SubmitButton;
