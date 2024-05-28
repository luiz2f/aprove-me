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
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { IconButton } from "../../ui/IconButton";
import { Info } from "../../ui/InfoDetails";
import { ISOtoStringDate } from "../../utils/ISOtoStringDate";
import { StyledModal } from "../../ui/StyledModal";
import { useEffect, useState } from "react";

const StyledCreateAssignor = styled.div`
  max-width: 400px;
  height: fit-content;
  color: #333;
  background-color: #fff;
  border: 1px solid #eaf1fc;
  padding: 48px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 0 20px #00000012;
`;
const StyledTitleCreateAssignor = styled.div`
  font-size: 28px;
  font-weight: 700;
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 36px;
`;
const Form = styled.form``;
const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;
const Grid2C = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 8px;
`;

export default function EditAssignor({ assignor, onClose }) {
  const [key, setKey] = useState(0); // Estado para controlar a chave do componente

  const { id, document, name, phone, email, createdAt, updatedAt } = assignor;
  const { register, handleSubmit, reset, formState, getValues, setError } =
    useForm({
      defaultValues: {
        name,
        document,
        phone,
        email,
      },
    });
  const { errors } = formState;
  const { createAssignor, isCreating, error: errorsApi } = useCreateAssignor();
  const { errorFlags, resetErrorFlags } = useErrorHandling(errorsApi?.message);
  const ref = useOutsideClick(onClose);
  const [hasChanges, setHasChanges] = useState(true);
  const currentValues = getValues();

  function checkChange() {
    const newAssignor = {
      name: getValues("name"),
      document: getValues("document").replace(/[^\d.-]/g, ""),
      phone: getValues("phone"),
      email: getValues("email"),
    };
    const isChanged = Object.keys(newAssignor).some(
      (key) => newAssignor[key] !== assignor[key]
    );
    setHasChanges(!isChanged);
  }
  function onSubmit(data) {
    const newAssignor = {
      ...data,
      document: data.document.replace(/[^\d.-]/g, ""),
    };
    // Check if there are any changes
    // const hasChanges = Object.keys(newAssignor).some(
    //   (key) => newAssignor[key] !== assignor[key]
    // );

    createAssignor(
      { newAssignor, id },
      {
        onSuccess: () => {
          reset(newAssignor);
          resetErrorFlags();
          toast.success("Cedente atualizado com sucesso.");
          setHasChanges(true);
        },
        onError: (error) => {
          console.log(error?.message);
          if (error?.message == "email must be an email") {
            setError("email", {
              message: "Insira um email válido",
            });
          } else {
            toast.error(`Erro: Insira um email válido`);
          }
        },
      }
    );
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

  // COLOCAR CPF CNPJ

  return (
    <StyledModal key={key}>
      <StyledCreateAssignor ref={ref}>
        <Flex>
          <StyledTitleCreateAssignor>Editar cedente</StyledTitleCreateAssignor>
          <IconButton onClick={onClose}>
            <HiOutlineXMark />
          </IconButton>
        </Flex>
        <Info title="ID do Recebível">{id}</Info>
        <Grid2C>
          <Info title="Criado em">{ISOtoStringDate(createdAt)}</Info>
          <Info className="right" title="Última Atualização">
            {ISOtoStringDate(updatedAt)}
          </Info>
        </Grid2C>

        <Form onSubmit={handleSubmit(onSubmit, onError)} onChange={checkChange}>
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
              errors?.email?.message ||
              (errorFlags?.email ? "Email já está em uso" : "")
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
                  message: "Insira um email válido",
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
            <Button
              disabled={hasChanges}
              type="submit"
              size="large"
              $widthohp="true"
            >
              Atualizar
            </Button>
          </StyledButtonBox>
        </Form>
      </StyledCreateAssignor>
    </StyledModal>
  );
}
