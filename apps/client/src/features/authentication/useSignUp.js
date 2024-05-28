import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignUp() {
  const {
    mutate: signUp,
    isPending,
    error: errorApi,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {},
    onError: (err) => {
      console.log("ERROR", err);
      // toast.error("Provided email or password are incorrect");
    },
  });

  return { signUp, isPending, errorApi };
}
