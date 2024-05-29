import styled from "styled-components";
import { useAuth } from "../features/authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useQueryClient } from "@tanstack/react-query";
const FullPage = styled.div`
  height: 100vh;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const [updateToken, setUpdateToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateToken((prev) => !prev);
    }, 60 * 1000); // refetch a cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const { isAuth, isPending } = useAuth();
  useEffect(() => {
    if (!isAuth && !isPending) {
      navigate("/login");
    }
  }, [isAuth, isPending, navigate]);

  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  if (isAuth) {
    return children;
  }
}

export default ProtectedRoute;
