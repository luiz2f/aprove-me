import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ISOtoStringDate } from "../../utils/ISOtoStringDate";
import { Button } from "../../ui/Button";
import { useCreatePayable } from "./useCreatePayable";
import Input from "../../ui/Input";
import StyledSelect from "../../ui/StyledSelect";
import FormRow from "../../ui/FormRow";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InputDate from "../../ui/InputDate";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi2";
import { useDeletePayable } from "./useDeletePayable";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { ButtonBox, DeleteButtonBox } from "../../ui/CreateEdit/ButtonBox";

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

export default function PayableForm({
  openPayable = {},
  assignorIds = [],
  createForm = false,
}) {
  const { id, value, emissionDate, assignorId } = openPayable || {};
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: createForm
      ? {}
      : {
          value: value || undefined,
          emissionDate: ISOtoStringDate(emissionDate, true) || undefined,
          assignorId: assignorId || undefined,
        },
  });
  const { errors } = formState;
  const { createPayable, isCreating } = useCreatePayable();
  const [hasChanges, setHasChanges] = useState(!createForm);
  const [selectedAssignorId, setSelectedAssignorId] = useState(assignorId);

  function checkChange() {
    const newPayable = {
      value: getValues("value"),
      emissionDate: new Date(getValues("emissionDate")).toISOString(),
      assignorId: getValues("assignorId"),
    };
    setSelectedAssignorId(getValues("assignorId"));
    const isChanged = Object.keys(newPayable).some(
      (key) => newPayable[key] !== openPayable[key]
    );
    setHasChanges(!isChanged);
  }
  const onSubmit = (data) => {
    createForm ? createFormSubmit(data) : editFormSubmit(data);
  };

  function createFormSubmit(data) {
    const newPayable = {
      ...data,
      value: parseFloat(data.value),
      emissionDate: new Date(data.emissionDate).toISOString(),
    };

    createPayable(newPayable, {
      onSuccess: () => {
        reset();
        toast.success("Recebível criado com sucesso.");
      },
    });
  }
  function editFormSubmit(data) {
    const newPayable = {
      ...data,
      value: parseFloat(data.value),
      emissionDate: new Date(data.emissionDate).toISOString(),
    };
    createPayable(
      { newPayable, id },
      {
        onSuccess: (updatedPayable) => {
          reset(data);
          toast.success("Recebível atualizado com sucesso.");
          setHasChanges(true);
        },
        onError: (error) => {
          toast.error(`Erro: ${error.message}`);
        },
      }
    );
  }

  function onError(error) {
    console.log(error, "sub");
  }
  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        onChange={!createForm ? checkChange : undefined}
      >
        <FormRow label="ID do Cedente" error={errors?.assignorId?.message}>
          <div id="assignorId">
            <StyledSelect
              $error={errors?.assignorId?.message}
              disabled={isCreating}
              type="text"
              id="assignorId"
              {...register("assignorId", {
                required: "Campo obrigatório",
              })}
            >
              {assignorId ? (
                <option value={assignorId}>{assignorId}</option>
              ) : (
                <option value="">Selecione um cedente</option>
              )}{" "}
              {assignorIds?.map((id) => {
                return (
                  <option key={id} value={id}>
                    {id}
                  </option>
                );
              })}
            </StyledSelect>
          </div>
        </FormRow>
        {!createForm ? (
          <NavLink to={`/cedentes/${selectedAssignorId}`}>
            <StyledButton type="button">Visualizar Cedente</StyledButton>
          </NavLink>
        ) : (
          ""
        )}
        <FormRow label="Valor" error={errors?.value?.message}>
          <Input
            $error={errors?.value?.message}
            disabled={isCreating}
            type="number"
            step="0.01"
            id="value"
            {...register("value", {
              required: "Campo obrigatório",
              validate: (value) =>
                parseFloat(value) >= 0.01 || "Inserir um valor válido",
            })}
          />
        </FormRow>
        <FormRow label="Data da Emissão" error={errors?.emissionDate?.message}>
          <InputDate
            $error={errors?.emissionDate?.message}
            disabled={isCreating}
            id="emissionDate"
            {...register("emissionDate", {
              required: "Campo obrigatório",
            })}
          />
        </FormRow>
        <ButtonBox>
          <Button disabled={hasChanges} size="large" $widthohp="true">
            {createForm ? "Criar Novo Recebível" : "Atualizar Recebível"}
          </Button>
        </ButtonBox>
      </Form>
      {!createForm ? (
        <DeleteButtonBox>
          <Modal.Open opens={`recebivel${id}`}>
            <Button type="dangerlight" size="small" $widthohp="true">
              Apagar Recebível
            </Button>
          </Modal.Open>
        </DeleteButtonBox>
      ) : (
        ""
      )}
    </>
  );
}
