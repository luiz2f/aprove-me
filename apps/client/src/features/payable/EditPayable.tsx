import styled from "styled-components";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { HiOutlineXMark } from "react-icons/hi2";
import { useCreatePayable } from "./useCreatePayable";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useAssignors } from "../assignor/useAssignors";
import { ISOtoStringDate } from "../../utils/ISOtoStringDate";
import { Button } from "../../ui/Button";
import { Info } from "../../ui/InfoDetails";
import { StyledModal } from "../../ui/StyledModal";
import { IconButton } from "../../ui/IconButton";
import Input from "../../ui/Input";
import StyledSelect from "../../ui/StyledSelect";
import FormRow from "../../ui/FormRow";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StyledCreatePayable = styled.div`
  box-shadow: 0 0 20px #00000012;

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

export default function EditPayable({ payable, onClose }) {
  const { id, value, emissionDate, assignorId, createdAt, updatedAt } = payable;
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: {
      value,
      emissionDate: ISOtoStringDate(emissionDate, true),
      assignorId,
    },
  });
  const [hasChanges, setHasChanges] = useState(true);
  console.log("test");
  const navigate = useNavigate();
  const { errors } = formState;
  const { createPayable, isCreating } = useCreatePayable();
  const { assignors } = useAssignors();
  const ref = useOutsideClick(onClose);

  function checkChange() {
    const newPayable = {
      value: getValues("value"),
      emissionDate: new Date(getValues("emissionDate")).toISOString(),
      assignorId: getValues("assignorId"),
    };
    const isChanged = Object.keys(newPayable).some(
      (key) => newPayable[key] !== payable[key]
    );
    setHasChanges(!isChanged);
  }
  function calendarShowPicker(e) {
    e?.target?.showPicker();
  }
  function onSubmit(data) {
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
    <StyledModal>
      <StyledCreatePayable ref={ref}>
        <Flex>
          <StyledTitleCreatePayable>Recebível</StyledTitleCreatePayable>
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
                <option value={assignorId}>{assignorId}</option>
                {assignors?.map((assignor) => {
                  return (
                    <option key={assignor.id} value={assignor.id}>
                      {assignor.id}
                    </option>
                  );
                })}
              </StyledSelect>
            </div>
          </FormRow>
          <StyledButton
            type="button"
            onClick={() => navigate(`/cedentes/${assignorId}`)}
          >
            Visualizar Cedente{" "}
          </StyledButton>

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
            <Button
              disabled={hasChanges}
              type="submit"
              size="large"
              $widthohp="true"
            >
              Atualizar Recebível
            </Button>
          </StyledButtonBox>
        </Form>
      </StyledCreatePayable>
    </StyledModal>
  );
}
