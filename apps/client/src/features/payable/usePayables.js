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
    data: payables = [],
    error,
    failureReason,
  } = useQuery({
    queryKey: ["payable"],
    queryFn: getPayables,
    retry: 3,
  });

  if (failureReason?.message.includes("401")) {
    queryClient.invalidateQueries();
    navigate("/login", { replace: true });
    toast.error("Sua sessão expirou, faça login novamente para continuar");
  }

  const count = payables?.length;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const findPayable = payables;
  const paginatedPayables = payables?.slice(startIndex, endIndex);

  return { isPending, payables: paginatedPayables, findPayable, count, error };
}
