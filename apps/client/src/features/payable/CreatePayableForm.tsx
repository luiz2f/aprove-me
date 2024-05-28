import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import { StyledModal } from "../../ui/StyledModal";
import { useForm } from "react-hook-form";
import { useCreatePayable } from "./useCreatePayable";
import StyledSelect from "../../ui/StyledSelect";
import { useAssignors } from "../assignor/useAssignors";
import { useContext } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ModalContext } from "../../ui/Modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { IconButton } from "../../ui/IconButton";
import toast from "react-hot-toast";

const StyledCreatePayable = styled.div`
  max-width: 400px;
  height: fit-content;
  color: #333;
  background-color: #fff;
  border: 1px solid #eaf1fc;
  padding: 48px;
  margin: auto;
  border-radius: 10px;
`;
const StyledTitleCreatePayable = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 36px;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;
const Form = styled.form``;
const MaxContent = styled.div`
  width: max-content;
`;

export default function CreatePayableForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { createPayable, isCreating, error: errorsApi } = useCreatePayable();
  const { assignors } = useAssignors();
  const { close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  function calendarShowPicker(e) {
    e?.target?.showPicker();
    console.log(e.target);
  }

  function onSubmit(data) {
    const formattedData = {
      ...data,
      value: parseFloat(data.value),
      emissionDate: new Date(data.emissionDate).toISOString(),
    };

    createPayable(formattedData, {
      onSuccess: () => {
        reset();
        toast.success("Recebível criado com sucesso.");
      },
    });
  }
  function onError(error) {
    console.log(error, "sub");
  }

  return (
    <StyledModal>
      <StyledCreatePayable ref={ref}>
        <Flex>
          <StyledTitleCreatePayable>
            {" "}
            Cadastrar novo recebível
          </StyledTitleCreatePayable>
          <IconButton onClick={close}>
            <HiOutlineXMark />
          </IconButton>
        </Flex>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormRow label="ID do Cedente" error={errors?.assignorId?.message}>
            <StyledSelect
              $error={errors?.assignorId?.message}
              disabled={isCreating}
              type="text"
              id="assignorId"
              {...register("assignorId", {
                required: "Campo obrigatório",
              })}
            >
              <option value="">Selecione uma cedente</option>
              {assignors?.map((assignor) => {
                return (
                  <option key={assignor.id} value={assignor.id}>
                    {assignor.id}
                  </option>
                );
              })}
            </StyledSelect>
          </FormRow>
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
          <FormRow
            label="Data da Emissão"
            error={errors?.emissionDate?.message}
          >
            <Input
              $error={errors?.emissionDate?.message}
              disabled={isCreating}
              type="date"
              id="emissionDate"
              onClick={(e) => calendarShowPicker(e)}
              onFocus={(e) => calendarShowPicker(e)}
              {...register("emissionDate", {
                required: "Campo obrigatório",
              })}
            />
          </FormRow>

          <StyledButtonBox>
            <Button type="submit" size="large" $widthohp="true">
              Cadastrar
            </Button>
          </StyledButtonBox>
        </Form>
      </StyledCreatePayable>
    </StyledModal>
  );
}
