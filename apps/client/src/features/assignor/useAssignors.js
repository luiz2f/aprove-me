import { useQuery } from "@tanstack/react-query";
import { getAssignors } from "../../services/apiAssignors";

export function useAssignors() {
  const {
    isPending,
    data: assignors,
    error,
  } = useQuery({
    queryKey: ["assignor"],
    queryFn: getAssignors,
  });

  return { isPending, assignors, error };
}
