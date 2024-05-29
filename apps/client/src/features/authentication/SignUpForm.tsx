import { useState } from "react";
import styled, { css } from "styled-components";
import { useSignUp } from "./useSignUp";
import { useForm } from "react-hook-form";
import logoBankme from "../../assets/logo-bankme.png";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

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
  font-weight: 500;

  ${(props) =>
    props.$error &&
    css`
      border: 1px solid #c95454;
      background-color: #fff9f9;
    `}
  &:not(:first-child) {
    margin-top: 16px;
  }
  .signup & {
    color: #fff;
    background-color: #0a36b0;
    border: 1px solid #eee;
    &::placeholder {
      color: #eeeeee8f;
    }
    ${(props) =>
      props.$error &&
      css`
        border: 1px solid #ecb3b3;
        background-color: #ff3e3e52;
        &::placeholder {
          color: #ecb3b3;
        }
      `}
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
const ErrorMessage = styled.div`
  color: #ecbebe;
  display: flex;
  font-weight: 500;
  padding-left: 20px;
  padding-top: 4px;
`;

function SignUpForm({ typeIndex, setTypeLogin }) {
  const { register, handleSubmit, reset, formState, getValues, setError } =
    useForm();
  const { errors } = formState;
  const { signUp, isPending, errorApi } = useSignUp();
  function onSubmit(data) {
    const credentials = {
      login: data.newLogin,
      password: data.newPassword,
    };

    signUp(credentials, {
      onSuccess: () => {
        // console.log("conta criada");
        setTypeLogin(true);

        toast.success("Conta criada com sucesso");
      },
      onError: (err) => {
        if (err === "Username already exists") {
          setError("newLogin", {
            type: "custom",
            message: "Este nome já está em uso",
          });
        }
      },
    });
  }
  function onError(error) {
    console.log(error, "sub");
  }

  function tabIndex(type) {
    if (type) {
      return 0;
    } else {
      return -1;
    }
  }

  return (
    <LogSigBox className="signup">
      <StyledLogoHolder>
        <StyledLogoImg src={logoBankme} alt="Logo Bankme" />
      </StyledLogoHolder>
      <StyledSectionTitle>Cadastro</StyledSectionTitle>
      <StyledSectionText>Gestão de Cedentes e Recebíveis</StyledSectionText>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <StyledInput
          placeholder="Novo Usuário"
          type="newLogin"
          tabIndex={typeIndex}
          $error={errors?.newLogin?.message}
          disabled={isPending}
          id="newLogin"
          autoComplete="username"
          {...register("newLogin", {
            required: "Campo obrigatório",
          })}
        />
        {errors?.newLogin?.message ? (
          <ErrorMessage>{errors?.newLogin?.message}</ErrorMessage>
        ) : (
          ""
        )}
        <StyledInput
          placeholder="Senha"
          type="password"
          tabIndex={typeIndex}
          $error={errors?.newPassword?.message}
          disabled={isPending}
          id="newPassword"
          autoComplete="new-password"
          {...register("newPassword", {
            required: "Campo obrigatório",
          })}
        />
        {errors?.newPassword?.message ? (
          <ErrorMessage>{errors?.newPassword?.message}</ErrorMessage>
        ) : (
          ""
        )}
        <StyledInput
          placeholder="Confirmar Senha"
          type="password"
          tabIndex={typeIndex}
          $error={errors?.confirmPassword?.message}
          disabled={isPending}
          id="confirmPassword"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: "Campo obrigatório",
            validate: (value) =>
              value === getValues().newPassword || "As senhas devem ser iguais",
          })}
        ></StyledInput>
        {errors?.confirmPassword?.message ? (
          <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
        ) : (
          ""
        )}
        <StyledButton tabIndex={typeIndex}>Cadastrar Usuário</StyledButton>
      </form>
      <StyledLink
        tabIndex={typeIndex}
        onClick={() => setTypeLogin((typeLogin: boolean) => !typeLogin)}
      >
        Já tenho uma conta
      </StyledLink>
    </LogSigBox>
  );
}

export default SignUpForm;
