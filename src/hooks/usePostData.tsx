import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/app/Providers";

// Define a type for errors that include a response property
interface ErrorWithResponse {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

type UsePostArgs<TData, TError extends ErrorWithResponse, TVariables> = {
  handleSuccess?: (data: TData) => void;
  mutateFn: (variables: TVariables) => Promise<TData>;
};

type UsePostReturn<TData, TError, TVariables> = {
  mutate: (variables: TVariables) => Promise<void>;
  isSuccess: boolean;
  isError: boolean;
  error: TError | null;
  data: any;
  isPending: boolean;
  status: any;
};

const usePost = <TData, TError extends ErrorWithResponse, TVariables>({
  handleSuccess = () => {},
  mutateFn,
}: UsePostArgs<TData, TError, TVariables>): UsePostReturn<
  TData,
  TError,
  TVariables
> => {
  const router = useRouter();

  const mutation = useMutation<TData, TError, TVariables>({
    mutationFn: mutateFn,
    onSuccess: (data) => {
      handleSuccess(data);
    },
    retry: false,
    onError: (error: TError) => {
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        return router.push("/login");
      }
    },
  });

  const mutate = (variables: TVariables): Promise<void> => {
    return new Promise((resolve, reject) => {
      mutation.mutate(variables, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  return {
    mutate,
    status: mutation.status,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    isError: mutation.isError,
    error: mutation.error,
    isPending: mutation.isPending,
  };
};

export default usePost;
