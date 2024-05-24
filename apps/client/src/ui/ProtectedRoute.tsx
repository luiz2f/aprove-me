import styled from "styled-components";
import { useAuth } from "../features/authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";
const FullPage = styled.div`
  height: 100vh;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

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
