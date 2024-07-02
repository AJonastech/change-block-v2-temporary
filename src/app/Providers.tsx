// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
//import { ThemeProvider as NextThemesProvider } from "next-themes";
//import { SessionProvider } from "next-auth/react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ToastContainer } from "react-toastify";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextUIProvider>
      {/* <NextThemesProvider {...props}> */}
      {/* <SessionProvider> */}
      {children}
      <ToastContainer />
      {/* </SessionProvider> */}
      {/* </NextThemesProvider> */}
    </NextUIProvider>
  );
}
