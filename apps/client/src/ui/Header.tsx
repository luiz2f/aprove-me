import styled from "styled-components";
import logoBankme from "../assets/logo-bankme.png";
import { useLogout } from "../features/authentication/useLogout";

const StyledHeader = styled.div`
  background-color: #fff;
  height: 90px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const StyledLogoHolder = styled.div`
  height: inherit;
`;
const StyledLogoImg = styled.img`
  height: 48px;
  padding: 24px;
  padding-left: 48px;
`;
const StyledUserHolder = styled.div`
  color: #333;
  display: flex;
  font-size: 20px;
  grid-column: 3;
  align-self: center;
  justify-self: end;
  margin-right: 48px;
`;
const StyledUserExit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  gap: 4px;
`;
const StyledExitButton = styled.button`
  font-family: "Nunito Sans", sans-serif;
  border: 0;
  background-color: transparent;
  padding: 0;
  color: #005fff;
  cursor: pointer;
`;
const StyledUserIcon = styled.div`
  border-radius: 50%;
  width: 42px;
  height: 42px;
  background-color: #ddd;
`;
const StyledGreeting = styled.div`
  align-self: center;
  margin-right: 36px;
  font-weight: 500;
`;
function Header() {
  const { logout } = useLogout();

  function handleLogout(e) {
    e.preventDefault;
    logout();
  }
  return (
    <StyledHeader>
      <StyledLogoHolder>
        <StyledLogoImg src={logoBankme} alt="Logo Bankme" />
      </StyledLogoHolder>
      <StyledUserHolder>
        <StyledGreeting>Olá, Usuário</StyledGreeting>
        <StyledUserExit>
          <StyledUserIcon></StyledUserIcon>
          <StyledExitButton onClick={(e) => handleLogout(e)}>
            Sair da Conta
          </StyledExitButton>
        </StyledUserExit>
      </StyledUserHolder>
    </StyledHeader>
  );
}
export default Header;
