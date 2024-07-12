import React from "react";
import { useFormContext, Controller, FieldValues, FieldPath } from "react-hook-form";


// FormField Component
type FormFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  render: (props: { field: any }) => JSX.Element;
}

const FormField = <TFieldValues extends FieldValues>({ name, render }: FormFieldProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <div className="form-field">{render({ field })}</div>}
    />
  );
};

export default FormField;
