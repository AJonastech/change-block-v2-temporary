import { UseFormRegister, FieldError } from "react-hook-form";

export interface FormFieldProps {
  name: string;
  register?: UseFormRegister<any>;
  error?: FieldError;
  render?: (props: any) => JSX.Element;
  children?: React.ReactNode;
  [key: string]: any; // additional props
}