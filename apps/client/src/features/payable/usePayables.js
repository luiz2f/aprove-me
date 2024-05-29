import { useQuery } from "@tanstack/react-query";
import { getPayables } from "../../services/apiPayables";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function usePayables() {
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isPending,
    data: payables = [],
    error,
  } = useQuery({
    queryKey: ["payable"],
    queryFn: getPayables,
  });

  const count = payables?.length;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const findPayable = payables;
  const paginatedPayables = payables.slice(startIndex, endIndex);

  return { isPending, payables: paginatedPayables, findPayable, count, error };
}
