import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayable as createPayableApi } from "../../services/apiPayables";

export function useCreatePayable() {
  const queryClient = useQueryClient();

  const {
    mutate: createPayable,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createPayableApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payable"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { createPayable, isCreating, error };
}
