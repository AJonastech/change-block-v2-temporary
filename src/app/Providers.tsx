"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import withAuth from "./WithAuth";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children, ...props }: ThemeProviderProps) {
  const queryClient = getQueryClient();

  // Wrap children with withAuth HOC
  const AuthWrappedChildren = withAuth(() => <>{children}</>);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <AuthWrappedChildren />
        <ToastContainer />
      </NextUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
