import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAssignor as deleteAssignorApi } from "../../services/apiAssignors";

export function useDeleteAssignor() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAssignor,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteAssignorApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assignor"],
      });
    },
    onError: (err) => {
      console.log("ERROR", err.message);
    },
  });

  return { deleteAssignor, isDeleting, error };
}
