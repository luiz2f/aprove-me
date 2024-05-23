import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./authProvider";

export function useLogout() {
  const navigate = useNavigate();
  const { setIsAuth } = useAuthContext();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      setIsAuth(false);
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}
