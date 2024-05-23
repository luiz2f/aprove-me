import styled from "styled-components";
import { useAuth } from "../features/authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { useAuthContext } from "../features/authentication/authProvider";
const FullPage = styled.div`
  height: 100vh;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuth } = useAuthContext();
  const { auth, isPending } = useAuth();
  useEffect(() => {
    auth();
    console.log();
  }, []);
  useEffect(() => {
    console.log(isAuth, isPending);
  }, []);
  // setTimeout(() => {

  if (!isAuth && !isPending) {
    return (
      <>
        <FullPage>
          <Spinner />
        </FullPage>
      </>
    );
  }
  if (isAuth) {
    return children;
  }
}

export default ProtectedRoute;
