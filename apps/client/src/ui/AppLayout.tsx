import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  height: 100vh;
  background-color: #f8fafc;
  overflow-y: hidden;
`;
const StyledPadding = styled.div`
  height: calc(100% - 90px);
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
