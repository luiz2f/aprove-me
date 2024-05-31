import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { getAssignor } from "../../services/apiAssignors";

export function useAssignor() {
  const { id } = useParams();

  const {
    isPending,
    data: assignor,
    error,
  } = useQuery({
    queryKey: ["assignor", id],
    queryFn: () => getAssignor(id),
    retry: false,
  });

  return { isPending, error, assignor };
}
