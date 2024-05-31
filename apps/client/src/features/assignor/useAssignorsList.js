import { useQuery } from "@tanstack/react-query";
import { getAssignorsIdsList } from "../../services/apiAssignors";

export function useAssignorsList() {
  const {
    isPending,
    data: assignorIds,
    error,
  } = useQuery({
    queryKey: ["assignor"],
    queryFn: getAssignorsIdsList,
    retry: false,
  });

  return { isPending, error, assignorIds };
}
