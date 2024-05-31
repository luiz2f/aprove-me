import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { getPayable } from "../../services/apiPayables";

export function usePayable() {
  const { id } = useParams();

  const {
    isPending,
    data: payable,
    error,
  } = useQuery({
    queryKey: ["payable", id],
    queryFn: () => getPayable(id),
    retry: false,
  });

  return { isPending, error, payable };
}
