import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useCreatePayable } from "./useCreatePayable";
import StyledSelect from "../../ui/StyledSelect";
import { useAssignors } from "../assignor/useAssignors";
import { Info } from "../../ui/InfoDetails";
import { ISOtoStringDate } from "../../utils/ISOtoStringDate";
import { HiOutlineXMark } from "react-icons/hi2";

const StyledModal = styled.div`
  z-index: 2;
  position: absolute;
  display: grid;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  top: 0;
  margin: auto 0;
`;
const StyledCreatePayable = styled.div`
  height: fit-content;
  color: #333;
  background-color: #fff;
  border: 1px solid #eaf1fc;
  padding: 48px;
  margin: auto;
  border-radius: 10px;
`;
const StyledTitleCreatePayable = styled.div`
  font-size: 28px;
  font-weight: 700;
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 28px;
  margin-top: 36px;
`;
const Grid2C = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 8px;
`;
const Form = styled.form``;
const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;
const IconButton = styled.button`
  color: #555;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  padding: 6px 6px 3px 6px;
  transition: all 200ms;
  cursor: pointer;
  &:hover {
    color: #0a36b0;
  }
  & svg {
    font-size: 20px;
  }
`;

export default function PayableDetails({ payable, onClose }) {
  const { id, value, emissionDate, assignorId, createdAt, updatedAt } = payable;
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      value,
      emissionDate,
      assignorId,
    },
  });
  const { errors } = formState;
  const { createPayable, isCreating } = useCreatePayable();
  const { assignors } = useAssignors();

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

    console.log(formattedData);
    createPayable(formattedData, {
      onSuccess: () => {
        reset();
      },
    });
  }
  function onError(error) {
    console.log(error, "sub");
  }

  return (
    <StyledModal>
      <StyledCreatePayable>
        <Flex>
          <StyledTitleCreatePayable>Recebível </StyledTitleCreatePayable>
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
              autoComplete="username"
              {...register("emissionDate", {
                required: "Campo obrigatório",
              })}
            />
          </FormRow>
          <StyledButtonBox>
            <Button type="submit" size="large" $widthohp="true">
              Atualizar Recebível
            </Button>
          </StyledButtonBox>
        </Form>
      </StyledCreatePayable>
    </StyledModal>
  );
}
