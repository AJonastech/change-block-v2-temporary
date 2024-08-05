// This hook will handle all the data fetching on the application (GET requests)
/* eslint-disable react-hooks/exhaustive-deps */
import { getQueryClient } from "@/app/Providers";
import { useQuery, QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface FetchDataResult<TData> {
  data: TData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isSuccess: boolean;
}

export const useFetchData = <TData,>(
  key: QueryKey,
  fetchFn: () => Promise<TData>,
  enabled: boolean = true
): FetchDataResult<TData> => {
  const queryClient = getQueryClient()
  const router = useRouter();

  const { data, isLoading, isError, error, isSuccess }: UseQueryResult<TData> = useQuery<TData>({
    queryKey: key,
    queryFn: fetchFn,
    enabled: enabled,
    refetchOnMount:true
  });

  useEffect(() => {
    const handleErrors = async () => {
      if (
        isError &&
        ((error as any)?.response?.status === 400 || (error as any)?.response?.status === 401)
      ) {
        // Some action here
        console.log("Error 400 or 401");
        // queryClient.clear();
        // router.push("/login");
      }
    };

    handleErrors();
  }, [isError, error,  queryClient]);

  return { data, error, isLoading, isError, isSuccess };
};
