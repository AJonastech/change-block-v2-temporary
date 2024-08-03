"use client"
import Link from 'next/link';
import { Button, Checkbox, Input } from '@nextui-org/react';
import React, { useEffect } from 'react';
import FormField from './FormField';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Googleicon } from '@/icons';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';


const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})
type LoginFormType = z.infer<typeof LoginFormSchema>;
function LoginForm() {
  const router = useRouter()
  const { login, isLoading, error, refreshAccessToken } = useAuthStore()
  const {isAuthenticated} = useAuthStore()
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  useEffect(()=>{
    if(isAuthenticated){
      router.push("/empa")
    }
  },[isAuthenticated])

  const handleLogin = async (data: LoginFormType) => {
    await login(data)


    router.push("/internal-tools")

  }
  return (
    <FormProvider {...form}>
      <div className=' bg-white p-8 max-w-[678px] mx-auto rounded-[32px]'>
        <form onSubmit={form.handleSubmit(handleLogin)} className="max-w-[550px] mx-auto">
          <div className="text-center mb-4">
            <h4 className="heading-h4 font-generalSans mb-1 font-bold text-grey-700">Welcome Back</h4>
            <p className="text-[#585264] font-light font-satoshi">Please enter your details to Log In</p>
          </div>
          <div className="flex justify-center mb-6 bg-grey-10 rounded-full p-[5px] w-fit mx-auto">
            <Link href="/sign-up" className="font-satoshi py-2 px-4 font-semibold text-grey-100 text-lg ">
              Sign Up
            </Link>
            <Link href="/login" className=" text-green-500 bg-lemon-75 py-2 px-4 rounded-full">
              Log In
            </Link>
          </div>
          <div className='flex flex-col gap-10'>

            <FormField<LoginFormType>
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


            <FormField<LoginFormType>
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
              <Checkbox />
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
            {
              isLoading ? "Logging In..." : "Log In →"
            }
          </Button>
          <div className="text-center mt-4">
            <p className="text-grey-300 font-satoshi">
              You don’t have an account? <a href="#" className="text-[#5C73DB]">Sign Up</a>
            </p>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t-[1px] border-[#C1C2C0]/[65%]"></div>
            <span className="mx-2 text-sm font-satoshi text-center text-grey-100">OR <br />CONTINUE WITH</span>
            <div className="flex-grow border-t-[1px] border-[#C1C2C0]/[65%]"></div>
          </div>
          <Button
            type="button"
            className="w-full h-[56px] gap-x-2 py-2 px-4 text-grey-300 text-lg font-medium bg-white border-[1px] border-[#C1C2C0]/[65%]  flex items-center justify-center focus:outline-none hover:bg-gray-100 transition duration-200"
          >
            <Googleicon />
            Google
          </Button>

        </form>
      </div>

    </FormProvider>
  );
}

export default LoginForm;
