
"use client";

import { NextUIProvider } from "@nextui-org/react";

import { ThemeProviderProps } from "next-themes/dist/types";
import { ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children, ...props }: ThemeProviderProps) {

  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      {/* <NextThemesProvider {...props}> */}
      {/* <SessionProvider> */}
      {children}
      <ToastContainer />
      {/* </SessionProvider> */}
      {/* </NextThemesProvider> */}
    </NextUIProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
