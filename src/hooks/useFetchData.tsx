import { getQueryClient } from "@/app/Providers";
import { useQuery, QueryKey, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

// Define a type for errors that include a response property
interface ErrorWithResponse {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
  message?: string; // Add the message property here
}

interface FetchDataResult<TData> {
  data: TData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ErrorWithResponse | null; // Ensure error is of the correct type
  isSuccess: boolean;
}

export const useFetchData = <TData,>(
  key: QueryKey,
  fetchFn: () => Promise<TData>,
  enabled: boolean = true
): FetchDataResult<TData> => {
  const queryClient = getQueryClient();
  const router = useRouter();

  const { data, isLoading, isError, error, isSuccess }: UseQueryResult<TData, ErrorWithResponse> = useQuery<TData, ErrorWithResponse>({
    queryKey: key,
    queryFn: fetchFn,
    enabled: enabled,
    refetchOnMount: true,
  });

  useEffect(() => {
    const handleErrors = async () => {
      if (isError && error) {
        console.error("Query error:", error);
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message || "An error occurred";
        toast.error(errorMessage);
        if (status === 400 || status === 401) {
          // Some action here
          console.log("Error 400 or 401");
          // queryClient.clear();
          // router.push("/login");
        }
      }
    };

    handleErrors();
  }, [isError, error, queryClient, router]);

  return { data, error, isLoading, isError, isSuccess };
};
