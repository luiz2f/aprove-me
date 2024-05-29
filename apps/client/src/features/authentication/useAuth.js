import { useQuery } from "@tanstack/react-query";
import { validateUser } from "../../services/apiAuth";

export function useAuth() {
  const { isPending, data: auth } = useQuery({
    queryKey: ["user"],
    queryFn: validateUser,
    staleTime: 60 * 1000,
  });

  const isAuth = auth?.auth ? true : false;
  return { isAuth, isPending };
}
