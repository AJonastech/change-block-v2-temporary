"use client";
// Assuming your TypeScript environment is configured properly

import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";
import { useFormContext } from "react-hook-form";

// Define additional props for SubmitButton
interface SubmitButtonProps extends ButtonProps {

}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {

  const { formState } = useFormContext();
  return (
    <Button
      type="submit"
      className="w-fit max-w-[150px] flex items-center "
      color="primary"
      radius="sm"
      isLoading={formState.isSubmitting}

      {...props} // Spread the additional props
    >
      {formState.isSubmitting ? "processing" : props.children || "submit"}
    </Button>
  );
};

export default SubmitButton;
