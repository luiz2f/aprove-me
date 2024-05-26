import { useQuery } from "@tanstack/react-query";
import { getPayables } from "../../services/apiPayables";

export function useAssignors() {
  const {
    isPending,
    data: payables,
    error,
  } = useQuery({
    queryKey: ["payable"],
    queryFn: getPayables,
  });

  return { isPending, payables, error };
}
