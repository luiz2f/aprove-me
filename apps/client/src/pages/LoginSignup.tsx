import { useState } from "react";
import styled from "styled-components";
import logoBankme from "../assets/logo-bankme.png";

const StyledBackground = styled.div`
  width: 100%;
  height: 100vh;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f3f6fa;
  text-align: center;
`;
const StyledLoginBox = styled.div`
  color: #333;
  transition: all 200ms ease;
  display: grid;
  grid-template-columns: 1fr 1fr;
  display: grid;
  background-color: #fff;
  box-shadow: 0 0 20px #00000012;
  position: relative;
  overflow: hidden;
  width: 440px;
  .signup & {
    color: #fff;
    background-color: #0a36b0;
  }
`;
const StyledLogoImg = styled.img`
  height: 74px;
  width: fit-content;
  padding-top: 4px;
`;
const StyledLogoHolder = styled.div`
  height: 80px;
  width: 80px;
  padding: 24px;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 12px;
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  .signup & {
    color: #fff;
    background-color: #fff;
  }
`;
const StyledSectionTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
`;
const StyledSectionText = styled.div`
  font-size: 16px;
  margin-bottom: 64px;
`;
const StyledInput = styled.input`
  border: 1px solid #aeaeae;
  font-size: 16px;
  border-radius: 10px;
  width: 300px;
  padding: 14px 20px;
  margin-bottom: 16px;
  font-weight: 500;
  .signup & {
    color: #fff;
    background-color: #0a36b0;
    border: 1px solid #eee;
    &::placeholder {
      color: #eee;
    }
  }
  &::placeholder {
    color: #aeaeae;
  }
`;
const StyledButton = styled.button`
  color: #fff;
  background-color: #0a36b0;
  border: 1px solid #0a36b0;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  width: 346px;
  padding: 18px 20px;
  margin-top: 24px;
  margin-bottom: 24px;
  cursor: pointer;
  .signup & {
    color: #0a36b0;
    background-color: #fff;
    border: 1px solid #fff;
  }
`;
const StyledLink = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: underline;
  color: #005fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: max-content;
  margin: auto;
  .signup & {
    color: #b4dd22;
  }
`;
const LogSigBox = styled.div`
  padding: 48px;
  padding-bottom: 36px;
  display: flex;
  align-items: center;
  flex-direction: column;
  &.signup {
    background-color: #0a36b0;
    color: #fff;
  }
`;
const Slider = styled.div`
  display: flex;
  transition: all 400ms ease;
  .slide & {
    transform: translateX(-50%);
  }
`;

function LoginSignup() {
  const [login, setLogin] = useState(true);

  return (
    <StyledBackground>
      <StyledLoginBox className={login ? "" : "slide"}>
        <Slider>
          <LogSigBox>
            <StyledLogoHolder>
              <StyledLogoImg src={logoBankme} alt="Logo Bankme" />
            </StyledLogoHolder>
            <StyledSectionTitle>Login</StyledSectionTitle>
            <StyledSectionText>
              Gestão de Cedentes e Recebíveis
            </StyledSectionText>
            <StyledInput placeholder="Usuário"></StyledInput>
            <StyledInput placeholder="Senha" type="password"></StyledInput>
            <StyledButton>Login</StyledButton>
            <StyledLink onClick={() => setLogin((login) => !login)}>
              Criar uma conta
            </StyledLink>
          </LogSigBox>
          <LogSigBox className="signup">
            <StyledLogoHolder>
              <StyledLogoImg src={logoBankme} alt="Logo Bankme" />
            </StyledLogoHolder>
            <StyledSectionTitle>Cadastro</StyledSectionTitle>
            <StyledSectionText>
              Gestão de Cedentes e Recebíveis
            </StyledSectionText>
            <StyledInput placeholder="Novo Usuário"></StyledInput>
            <StyledInput placeholder="Senha" type="password"></StyledInput>
            <StyledButton>Cadastrar Usuário</StyledButton>
            <StyledLink onClick={() => setLogin((login) => !login)}>
              Já tenho uma conta
            </StyledLink>
          </LogSigBox>
        </Slider>
      </StyledLoginBox>
    </StyledBackground>
  );
}

export default LoginSignup;
