import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useHandleAuthFailure(failureReason) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (failureReason?.message.includes("401")) {
      queryClient.invalidateQueries();
      navigate("/login", { replace: true });
      toast.error("Sua sessão expirou, faça login novamente para continuar");
    }
  }, [failureReason, queryClient, navigate]);
}
