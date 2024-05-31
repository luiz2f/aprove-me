import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPayables } from "../../services/apiPayables";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import toast from "react-hot-toast";

export function usePayables() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isPending,
    data: payablesData,
    error,
    failureReason,
  } = useQuery({
    queryKey: ["payable", currentPage],
    queryFn: () => getPayables(currentPage),
    retry: 3,
  });

  if (failureReason?.message.includes("401")) {
    queryClient.invalidateQueries();
    navigate("/login", { replace: true });
    toast.error("Sua sessão expirou, faça login novamente para continuar");
  }
  const { data: payables, length } = payablesData || {};

  // pre-fetch
  if (length) {
    const pageCount = Math.ceil(length / PAGE_SIZE);
    if (currentPage < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["payable", currentPage + 1],
        queryFn: () => getPayables(currentPage + 1),
      });
    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["payable", currentPage - 1],
        queryFn: () => getPayables(currentPage - 1),
      });
  }

  return { isPending, payables, length, error };
}
