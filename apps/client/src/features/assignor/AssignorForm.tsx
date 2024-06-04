import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useCreateAssignor } from "./useCreateAssignor";
import { useErrorHandling } from "./error-handling/useErrorHandling";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import { Button } from "../../ui/Button";
import { makeEmail } from "./makeEmail";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { ButtonBox } from "../../ui/CreateEdit/ButtonBox";

const Form = styled.form``;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 0 8px;
  transform: translateY(-8px);
  color: #0a36b0;
  text-decoration: underline;
`;

const StyledDeleteButtonBox = styled.div`
  width: 100%;
  margin-top: 12px;
`;

export default function AssignorForm({
  openAssignor = {},
  createForm = false,
}) {
  const { id, document, name, phone, email } = openAssignor || {};
  const { register, handleSubmit, reset, formState, getValues, setError } =
    useForm({
      defaultValues: createForm
        ? {}
        : {
            document,
            name,
            phone,
            email,
          },
    });
  const { errors } = formState;
  const { createAssignor, isCreating, error: errorsApi } = useCreateAssignor();
  const { errorFlags, resetErrorFlags } = useErrorHandling(errorsApi?.message);
  const [hasChanges, setHasChanges] = useState(!createForm);

  function checkChange() {
    const newAssignor = {
      name: getValues("name"),
      document: getValues("document").replace(/[^\d.-]/g, ""),
      phone: getValues("phone"),
      email: getValues("email"),
    };
    const isChanged = Object.keys(newAssignor).some(
      (key) => newAssignor[key] !== openAssignor[key]
    );
    setHasChanges(!isChanged);
  }
  const onSubmit = (data) => {
    createForm ? createFormSubmit(data) : editFormSubmit(data);
  };

  function createFormSubmit(data) {
    const cleanedDocument = data.document.replace(/[^\d.-]/g, "");
    // Atualizar os dados com o document limpo
    data = { ...data, document: cleanedDocument };

    createAssignor(data, {
      onSuccess: () => {
        reset({
          name: "",
          document: "",
          email: "",
          phone: "",
        });
        resetErrorFlags();
        toast.success("Cedente criado com sucesso.");
      },
    });
  }
  function editFormSubmit(data) {
    const newAssignor = {
      ...data,
      document: data.document.replace(/[^\d.-]/g, ""),
    };
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

  function randomAssignor() {
    const newAssignor = {
      name: "Nomenilson da Silva Repetirdison",
      document: cpf.generate(),
      email: makeEmail(),
      phone: "(99) 99999 9999",
    };
    reset(newAssignor);
  }

  return (
    <>
      {createForm ? (
        <Button type="primarylight" size="small" onClick={randomAssignor}>
          Gerar dados
        </Button>
      ) : (
        ""
      )}
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        onChange={!createForm ? checkChange : undefined}
      >
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

        <ButtonBox>
          <Button disabled={hasChanges} size="large" $widthohp="true">
            {createForm ? "Criar Novo Cedente" : "Atualizar Cedente"}
          </Button>
        </ButtonBox>
      </Form>

      {!createForm ? (
        <StyledDeleteButtonBox>
          <Modal.Open opens={`cedente${id}`}>
            <Button type="dangerlight" size="small" $widthohp="true">
              Apagar Cedente
            </Button>
          </Modal.Open>
        </StyledDeleteButtonBox>
      ) : (
        ""
      )}
    </>
  );
}
