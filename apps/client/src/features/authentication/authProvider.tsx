import { createContext, useContext, useEffect, useState } from "react";
import { validateUser } from "../../services/apiAuth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function validateToken() {
      try {
        if (token) {
          const { authorized } = await validateUser();
          if (authorized) {
            setIsAuth(true);
          }
        }
      } catch (error) {}
    }
    if (token) {
      validateToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("authContextContext was used outside authContextProvider");
  return context;
}

export { AuthProvider, useAuthContext };
