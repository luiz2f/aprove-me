import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePayable as deletePayableApi } from "../../services/apiPayables";

export function useDeletePayable() {
  const queryClient = useQueryClient();

  const {
    mutate: deletePayable,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deletePayableApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payable"],
      });
    },
    onError: (err) => {
      console.log(error.code);

      console.log("ERROR", err.message);
    },
  });

  return { deletePayable, isDeleting, error };
}
