import { useState } from "react";
import styled, { css } from "styled-components";
import logoBankme from "../../assets/logo-bankme.png";
import { useLogin } from "./useLogin.js";
import { useForm } from "react-hook-form";
import {
  LogSigBox,
  LoginButton,
  LoginErrorMessage,
  LoginInput,
  LoginNavLink,
  LogoHolder,
} from "../../ui/Login/LoginStyles.js";

function LoginForm({ typeIndex, setTypeLogin }) {
  const { register, handleSubmit, reset, formState, setError } = useForm();
  const { errors } = formState;

  const { login, isPending } = useLogin();

  function onSubmit(data) {
    login(data, {
      onError: () => {
        setError("login", {
          type: "manual",
          message: true,
        });
        setError("password", {
          type: "manual",
          message: "Credenciais inválidas",
        });
      },
    });
  }
  function onError(error) {
    console.log(error);
  }

  return (
    <LogSigBox>
      <LogoHolder>
        <img src={logoBankme} alt="Logo Bankme" />
      </LogoHolder>
      <h3>Login</h3>
      <p>Gestão de Cedentes e Recebíveis</p>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <LoginInput
          placeholder="Novo Usuário"
          type="login"
          tabIndex={typeIndex}
          $error={errors?.login?.message}
          disabled={isPending}
          id="login"
          autoComplete="username"
          {...register("login", {
            required: "Campo obrigatório",
          })}
        />
        {errors?.login?.message ? (
          <LoginErrorMessage>{errors?.login?.message}</LoginErrorMessage>
        ) : (
          ""
        )}
        <LoginInput
          placeholder="Senha"
          type="password"
          tabIndex={typeIndex}
          $error={errors?.password?.message}
          disabled={isPending}
          id="password"
          autoComplete="password"
          {...register("password", {
            required: "Campo obrigatório",
          })}
        />
        {errors?.password?.message ? (
          <LoginErrorMessage>{errors?.password?.message}</LoginErrorMessage>
        ) : (
          ""
        )}
        <LoginButton tabIndex={typeIndex}>Login</LoginButton>
      </form>
      <LoginNavLink
        to="/signup"
        tabIndex={typeIndex}
        onClick={() => setTypeLogin((typeLogin: boolean) => !typeLogin)}
      >
        Criar uma conta
      </LoginNavLink>
    </LogSigBox>
  );
}

export default LoginForm;
