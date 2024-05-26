import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssignor as createAssignorApi } from "../../services/apiAssignors";

export function useCreateAssignor() {
  const queryClient = useQueryClient();

  const {
    mutate: createAssignor,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createAssignorApi,
    onSuccess: () => {
      // Invalida as queries no queryClient
      queryClient.invalidateQueries({
        queryKey: ["assignor"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { createAssignor, isCreating, error };
}
