import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { validateUser } from "../../services/apiAuth";
import { useAuthContext } from "./authProvider";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setIsAuth } = useAuthContext();
  const { mutate: auth, isPending } = useMutation({
    mutationFn: () => validateUser(),
    onSuccess: () => {
      setIsAuth(true);
      navigate("/recebiveis", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      navigate("/login", { replace: true });

      // toast.error("Provided email or password are incorrect");
    },
  });

  return { auth, isPending };
}
