"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import SubmitButton from "./SubmitButton";

const formFields = [
  { name: "name", type: "text", label: "Name", required: true },
  { name: "email", type: "email", label: "Email", required: true },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
    minLength: 6,
  },
];

interface TErrors {
  [key: string]: string;
}

const FormComponent: React.FC = () => {
  const [errors, setErrors] = useState<TErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    const field = formFields.find((field) => field.name === name);
    let error = "";

    if (field?.required && value.trim() === "") {
      error = `${field.label} is required`;
    } else if (field?.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    } else if (field?.minLength && value.length < field.minLength) {
      error = `${field.label} must be at least ${field.minLength} characters long`;
    }

    return error;
  };

  const validateForm = (formData: FormData) => {
    const newErrors: TErrors = {};
    formFields.forEach((field) => {
      const value = formData.get(field.name)?.toString() || "";
      const error = validateField(field.name, value);
      if (error) {
        newErrors[field.name] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleFormAction = async (formData: FormData) => {
    const isValid = validateForm(formData);
    if (isValid) {
      setIsSubmitted(true);
      console.log("Form submitted successfully:", formData);
    } else {
      console.log("Form submission failed. Please correct the errors.");
    }
  };

  return (
    <>
      <form
        action={handleFormAction}
        className="flex flex-col gap-2 max-w-md mx-auto p-6 h-full  shadow-md rounded-md"
      >
        {formFields.map((field) => (
          <Input
            key={field.name}
            label={field.label as string}
            placeholder={field.label as string}
            name={field.name}
            type={field.type}
            onChange={handleChange}
            className="mb-4"
            color={errors[field.name] ? "danger" : "default"}
            description={errors[field.name] as string}
            variant="bordered"
            labelPlacement="outside"
          />
        ))}
        <SubmitButton>Submit</SubmitButton>
      </form>
      {isSubmitted && (
        <p className="text-green-500 mt-4">Form submitted successfully!</p>
      )}
    </>
  );
};

export default FormComponent;
