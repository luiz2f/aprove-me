import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssignors } from "../../services/apiAssignors";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PAGE_SIZE } from "../../utils/constants";

export function useAssignors() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isPending,
    data: assignorsData,
    error,
    failureReason,
  } = useQuery({
    queryKey: ["assignor", currentPage],
    queryFn: () => getAssignors(currentPage),
  });

  if (failureReason?.message.includes("401")) {
    queryClient.invalidateQueries();
    navigate("/login", { replace: true });
    toast.error("Sua sessão expirou, faça login novamente para continuar");
  }

  const { data: assignors, length } = assignorsData || {};

  // pre-fetch
  if (length) {
    const pageCount = Math.ceil(length / PAGE_SIZE);
    if (currentPage < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["assignor", currentPage + 1],
        queryFn: () => getAssignors(currentPage + 1),
      });
    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["assignor", currentPage - 1],
        queryFn: () => getAssignors(currentPage - 1),
      });
  }

  return { isPending, assignors, length, error };
}
