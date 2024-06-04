import { useState } from "react";
import styled from "styled-components";
import logoBankme from "../../assets/logo-bankme.png";
import { useLogin } from "./useLogin";
import { useForm } from "react-hook-form";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Background, LoginBox, Slider } from "../../ui/Login/LoginStyles";
import { useLocation } from "react-router-dom";

function LoginSignUp() {
  const location = useLocation();
  const [typeLogin, setTypeLogin] = useState(location.pathname === "/login");

  function tabIndex(type) {
    return type ? 0 : -1;
  }

  return (
    <Background>
      <LoginBox className={typeLogin ? "" : "slide"}>
        <Slider>
          <LoginForm
            typeIndex={tabIndex(typeLogin)}
            setTypeLogin={setTypeLogin}
          />
          <SignUpForm
            typeIndex={tabIndex(!typeLogin)}
            setTypeLogin={setTypeLogin}
          />
        </Slider>
      </LoginBox>
    </Background>
  );
}

export default LoginSignUp;
