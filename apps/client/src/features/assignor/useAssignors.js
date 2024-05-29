import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssignors } from "../../services/apiAssignors";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useAssignors() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isPending,
    data: assignors,
    error,
    failureReason,
  } = useQuery({
    queryKey: ["assignor"],
    queryFn: getAssignors,
  });

  if (failureReason?.message.includes("401")) {
    queryClient.invalidateQueries();
    navigate("/login", { replace: true });
    toast.error("Sua sessão expirou, faça login novamente para continuar");
  }

  return { isPending, assignors, error };
}
