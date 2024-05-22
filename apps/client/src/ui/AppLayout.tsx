import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  height: 100vh;
  background-color: #f8fafc;
  overflow-y: hidden;
`;
const StyledPadding = styled.div`
  padding: 48px;
  height: 100%;
  overflow-y: scroll;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <StyledPadding>
        <Outlet />
      </StyledPadding>
    </StyledAppLayout>
  );
}

export default AppLayout;
