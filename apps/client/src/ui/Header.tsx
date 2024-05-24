import styled from "styled-components";
import logoBankme from "../assets/logo-bankme.png";
import { useLogout } from "../features/authentication/useLogout";
import { NavLink } from "react-router-dom";

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

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    color: #333;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    text-decoration: none;
    font-size: 24px;
    font-weight: 500;
    padding: 4px 36px 0 36px;
    transition: all 0.3s;
    border-bottom: 4px solid transparent;
    position: relative;
  }
  &:first-child:after {
    position: absolute;
    bottom: 0;
    right: 0;
    transition: all ease-in-out 0.2s;
    content: "";
    height: 4px;
    width: 0;
    background-color: #0a36b0;
  }
  &:last-child:after {
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all ease-out 0.05s;
    content: "";
    height: 4px;
    width: 0;
    background-color: #0a36b0;
  }
  &:hover::after,
  &.active:link::after,
  &.active:visited::after,
  &:hover,
  &.active:link,
  &.active:visited {
    width: 100%;
    color: #0a36b0;
  }
  &.active:link,
  &.active:visited {
    font-weight: 700;
  }
`;
const StyledBoxNavLink = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  height: 100%;
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
      <StyledBoxNavLink>
        <StyledNavLink to="/recebiveis">Recebiveis</StyledNavLink>
        <StyledNavLink to="/cedentes">Cedentes</StyledNavLink>
      </StyledBoxNavLink>
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
