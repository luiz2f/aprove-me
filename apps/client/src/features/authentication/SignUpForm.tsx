import { useState } from "react";
import styled, { css } from "styled-components";
import { useSignUp } from "./useSignUp";
import { useForm } from "react-hook-form";
import logoBankme from "../../assets/logo-bankme.png";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";
import {
  LogSigBox,
  LoginButton,
  LoginErrorMessage,
  LoginInput,
  LoginNavLink,
  LogoHolder,
} from "../../ui/Login/LoginStyles";
import { NavLink } from "react-router-dom";

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
      <LogoHolder>
        <img src={logoBankme} alt="Logo Bankme" />
      </LogoHolder>
      <h3>Cadastro</h3>
      <p>Gestão de Cedentes e Recebíveis</p>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <LoginInput
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
          <LoginErrorMessage>{errors?.newLogin?.message}</LoginErrorMessage>
        ) : (
          ""
        )}
        <LoginInput
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
          <LoginErrorMessage>{errors?.newPassword?.message}</LoginErrorMessage>
        ) : (
          ""
        )}
        <LoginInput
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
        ></LoginInput>
        {errors?.confirmPassword?.message ? (
          <LoginErrorMessage>
            {errors?.confirmPassword?.message}
          </LoginErrorMessage>
        ) : (
          ""
        )}
        <LoginButton tabIndex={typeIndex}>Cadastrar Usuário</LoginButton>
      </form>
      <LoginNavLink
        to="/login"
        tabIndex={typeIndex}
        onClick={() => setTypeLogin((typeLogin: boolean) => !typeLogin)}
      >
        Já tenho uma conta
      </LoginNavLink>
    </LogSigBox>
  );
}

export default SignUpForm;
