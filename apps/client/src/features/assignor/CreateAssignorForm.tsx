import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { useCreateAssignor } from "./useCreateAssignor";
import { useErrorHandling } from "./error-handling/useErrorHandling";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import { makeEmail } from "./makeEmail";
import { StyledModal } from "../../ui/StyledModal";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";

const StyledCreateAssignor = styled.div`
  box-shadow: 0 0 20px #00000012;

  max-width: 400px;
  height: fit-content;
  color: #333;
  background-color: #fff;
  border: 1px solid #eaf1fc;
  padding: 48px;
  margin: auto;
  border-radius: 10px;
`;
const StyledTitleCreateAssignor = styled.div`
  font-size: 28px;
  margin-bottom: 28px;
  font-weight: 700;
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 36px;
`;
const Form = styled.form``;

export default function CreateAssignorForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { createAssignor, isCreating, error: errorsApi } = useCreateAssignor();
  const { errorFlags, resetErrorFlags } = useErrorHandling(errorsApi?.message);
  const { close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  function onSubmit(data) {
    const cleanedDocument = data.document.replace(/[^\d.-]/g, "");
    // Atualizar os dados com o document limpo
    data = { ...data, document: cleanedDocument };

    createAssignor(data, {
      onSuccess: (data) => {
        reset({
          name: "",
          document: "",
          email: "",
          phone: "",
        });
        resetErrorFlags();
      },
    });
  }
  function onError(error) {
    console.log(error, "sub");
  }
  function validateDocument(value) {
    if (!cpf.isValid(value) && !cnpj.isValid(value)) {
      return "Insira um CPF ou CNPJ válido";
    }
    return true;
  }
  function randomAssignor() {
    let newAssignor = {
      name: "Nomenilson da Silva Repetirdison",
      document: cpf.generate(),
      email: makeEmail(),
      phone: "(99) 99999 9999",
    };
    reset(newAssignor);
  }

  // COLOCAR CPF CNPJ

  return (
    <StyledModal>
      <StyledCreateAssignor ref={ref}>
        <StyledTitleCreateAssignor>
          Cadastrar novo cedente
        </StyledTitleCreateAssignor>
        <Button onClick={randomAssignor}>Gerar dados</Button>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormRow label="Nome" error={errors?.name?.message}>
            <Input
              $error={errors?.name?.message}
              disabled={isCreating}
              type="text"
              id="name"
              {...register("name", {
                required: "Campo obrigatório",
                maxLength: {
                  value: 140,
                  message: "Nome deve ter no máximo 140 caracteres",
                },
              })}
            />
          </FormRow>

          <FormRow
            label="Documento (CPF ou CNPJ)"
            error={
              errorFlags?.document
                ? "Documento já está em uso"
                : "" || errors?.document?.message
            }
          >
            <Input
              $error={errorFlags?.document || errors?.document?.message}
              disabled={isCreating}
              type="text"
              id="document"
              {...register("document", {
                required: "Campo obrigatório",
                validate: validateDocument,

                minLength: {
                  value: 11,
                  message: "Insira um CPF ou CNPJ válido",
                },
                maxLength: {
                  value: 30,
                  message: "Documento deve ter no máximo 30 caracteres",
                },
              })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^\d.-]/g, "");
              }}
            />
          </FormRow>
          <FormRow
            label="Email"
            error={
              (errorFlags?.email ? "Email já está em uso" : "") ||
              errors?.email?.message
            }
          >
            <Input
              $error={errors?.email?.message || errorFlags?.email}
              disabled={isCreating}
              type="email"
              id="email"
              autoComplete="username"
              {...register("email", {
                required: "Campo obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Endereço de email invalido",
                },
                maxLength: {
                  value: 140,
                  message: "Email deve ter no máximo 140 caracteres",
                },
              })}
            />
          </FormRow>
          <FormRow label="Telefone" error={errors?.phone?.message}>
            <Input
              $error={errors?.phone?.message}
              disabled={isCreating}
              type="text"
              id="phone"
              {...register("phone", {
                required: "Campo obrigatório",
                minLength: {
                  value: 10,
                  message: "Insira um telefone válido: DDD + Número",
                },
              })}
            />
          </FormRow>

          <StyledButtonBox>
            <Button type="submit" size="large" $widthohp="true">
              Cadastrar
            </Button>
          </StyledButtonBox>
        </Form>
      </StyledCreateAssignor>
    </StyledModal>
  );
}
