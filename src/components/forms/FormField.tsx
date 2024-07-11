import React from "react";
import { useFormContext, Controller, FieldValues, FieldPath, } from "react-hook-form";


type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  render: (props: any) => JSX.Element;
}


const FormField = ({ name, render }:FormFieldProps) => {
  const { control, formState } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-field">
          {render({ field })}

        </div>
      )}
    />
  );
};

export default FormField;
