"use client"
import Link from 'next/link';
import { Button, Checkbox, Input } from '@nextui-org/react';
import React from 'react';
import FormField from './FormField';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Googleicon } from '@/icons';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';


const SignUpFormSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})
type SignUpFormType = z.infer<typeof SignUpFormSchema>;
function SignUpForm() {
const router = useRouter()
const {signup, isLoading, error} = useAuthStore()

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
const handleUserSignup = async (data: SignUpFormType) => {
    await signup(data)
    router.push("/login")
  }


  return (
    <FormProvider {...form}>
      <div className=' bg-white p-8 max-w-[678px] mx-auto rounded-[32px]'>
        <form onSubmit={form.handleSubmit(handleUserSignup)} className="max-w-[550px] mx-auto">
          <div className="text-center mb-4">
            <h4 className="heading-h4 font-generalSans mb-1 font-bold text-grey-700">Create Account</h4>
            <p className="text-[#585264] font-light font-satoshi">Please enter your details to continue</p>
          </div>
          <div className="flex justify-center mb-6 bg-grey-10 rounded-full p-[5px] w-fit mx-auto">
          <Link href="" className=" text-green-500 bg-lemon-75 py-2 px-4 rounded-full">
              Sign Up
            </Link>
            <Link href="" className="font-satoshi py-2 px-4 font-semibold text-grey-100 text-lg ">
              Log In
            </Link>
           
          </div>
          <div className='flex flex-col gap-10'>
          <FormField<SignUpFormType>
              name="name"
              render={({ field }) => (
                <Input
                  label="Name"
                  placeholder="Enter Full Name"
                  {...field}
                  type="text"
                  className="placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
                  classNames={{
                    label: " font-semibold font-satoshi !text-grey-300 pb-4 !text-lg leading-[25.2px]",
                    input: ["bg-transparent"],
                    innerWrapper: "bg-transparent px-4",
                    inputWrapper: ["bg-transparent border-[1px] !h-[3.5rem]"],
                  }}
                  color={form.formState.errors[field.name as keyof typeof form.formState.errors] ? "danger" : "default"}
                  description={form.formState.errors[field.name as keyof typeof form.formState.errors]?.message}
                  variant="bordered"
                  labelPlacement="outside"
                />
              )}
            />
            <FormField<SignUpFormType>
              name="email"
              render={({ field }) => (
                <Input
                  label="Email Address"
                  placeholder="Enter Email Address"
                  {...field}
                  type="text"
                  className="placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
                  classNames={{
                    label: " font-semibold font-satoshi !text-grey-300 pb-4 !text-lg leading-[25.2px]",
                    input: ["bg-transparent"],
                    innerWrapper: "bg-transparent px-4",
                    inputWrapper: ["bg-transparent border-[1px] !h-[3.5rem]"],
                  }}
                  color={form.formState.errors[field.name as keyof typeof form.formState.errors] ? "danger" : "default"}
                  description={form.formState.errors[field.name as keyof typeof form.formState.errors]?.message}
                  variant="bordered"
                  labelPlacement="outside"
                />
              )}
            />


            <FormField<SignUpFormType>
              name="password"
              render={({ field }) => (
                <Input
                  label="Password"
                  placeholder="Enter Password"
                  {...field}
                  type="text"
                  className="placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-300 placeholder:leading-[25.2px]"
                  classNames={{
                    label: " font-semibold font-satoshi !text-grey-300 pb-4 !text-lg leading-[25.2px]",
                    input: ["bg-transparent"],
                    innerWrapper: "bg-transparent px-4",
                    inputWrapper: ["bg-transparent border-[1px] !h-[3.5rem]"],
                  }}
                  color={form.formState.errors[field.name as keyof typeof form.formState.errors] ? "danger" : "default"}
                  description={form.formState.errors[field.name as keyof typeof form.formState.errors]?.message}
                  variant="bordered"
                  labelPlacement="outside"
                />
              )}
            />
          </div>
          <div className="flex items-center mt-3 justify-between mb-4">
            <label className="flex items-center font-satoshi text-lg font-light text-grey-300">
              <Checkbox/>
              Please remember me
            </label>
            <Link href="#" className="font-satoshi text-lg underline text-grey-300">Forgot Password?</Link>
          </div>
          <Button
            type="submit"
            color='primary'
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full  h-[56px] cursor-pointer  text-grey-20 font-medium text-lg "
          >
            {isLoading ? "Creating Acoount": "Sign Up →"} 
          </Button>
          <div className="text-center mt-4">
            <p className="text-grey-300 font-satoshi">
            I accept <Link href="#" className="text-[#5C73DB]">the terms and conditions of use</Link>
            </p>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t-[1px] border-[#C1C2C0]/[65%]"></div>
            <span className="mx-2 text-sm font-satoshi text-center text-grey-100">OR <br/>CONTINUE WITH</span>
            <div className="flex-grow border-t-[1px] border-[#C1C2C0]/[65%]"></div>
          </div>
          <Button
            type="button"
            className="w-full h-[56px] gap-x-2 py-2 px-4 text-grey-300 text-lg font-medium bg-white border-[1px] border-[#C1C2C0]/[65%]  flex items-center justify-center focus:outline-none hover:bg-gray-100 transition duration-200"
          >
           <Googleicon/>
            Google
          </Button>

        </form>
      </div>

    </FormProvider>
  );
}

export default SignUpForm;
