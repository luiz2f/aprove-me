import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayable as createPayableApi } from "../../services/apiPayables";
import { useHandleAuthFailure } from "../../hooks/useRedirect";

export function useCreatePayable() {
  const queryClient = useQueryClient();

  const {
    mutate: createPayable,
    isPending: isCreating,
    error,
    failureReason,
  } = useMutation({
    mutationFn: createPayableApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payable"],
      });
    },
    onError: (err) => {
      console.log(err.code);
      console.log(error);
      console.log("ERROR", err.message);
    },
  });
  useHandleAuthFailure(failureReason);

  return { createPayable, isCreating, error };
}
