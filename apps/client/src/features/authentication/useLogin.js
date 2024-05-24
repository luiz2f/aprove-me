import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: () => loginApi(),
    onSuccess: (data) => {
      const user = { ...data };
      user.auth = true;
      queryClient.setQueryData(["user"], user);
      navigate("/recebiveis", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      // toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}
