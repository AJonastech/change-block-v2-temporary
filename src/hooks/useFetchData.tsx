import { getQueryClient } from "@/app/Providers";
import { useQuery, QueryKey, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { refreshAccessToken } from '@/actions/authActions'; // Ensure the path is correct

interface ErrorWithResponse extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
      details?: string;
      detail?: string;
    };
  };
}

interface FetchDataResult<TData> {
  data: TData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ErrorWithResponse | null;
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
    retry: 1,
    refetchOnMount: true,

  });

  useEffect(() => {
    const handleErrors = async () => {
      if (isError && error) {

        try {
          // Attempt to refresh the token
          const response = await fetch('/api/auth/refresh');
          if (!response.ok) {
            throw new Error('Failed to refresh access token');
          }
          queryClient.invalidateQueries({ queryKey: key }); // Retry the query after refreshing the token
        } catch (refreshError) {
          console.error('Error refreshing access token', refreshError);
          queryClient.clear();
          router.push("/login");
        }


      }
    };

    handleErrors();
  }, [isError, error, queryClient, router, key]);

  return { data, error, isLoading, isError, isSuccess };
};
