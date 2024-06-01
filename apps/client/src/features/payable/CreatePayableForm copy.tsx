import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import { StyledModal } from "../../ui/StyledModal";
import { useForm } from "react-hook-form";
import { useCreatePayable } from "./useCreatePayable";
import StyledSelect from "../../ui/StyledSelect";
import { useAssignorsList } from "../assignor/useAssignorsList";
import { useContext } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ModalContext } from "../../ui/Modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { IconButton } from "../../ui/IconButton";
import toast from "react-hot-toast";
import PayableForm from "./PayableForm";

const StyledCreatePayable = styled.div`
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
  const { assignorIds } = useAssignorsList();
  const { close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  function calendarShowPicker(e) {
    e?.target?.showPicker();
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
        <PayableForm assignorIds={assignorIds} createForm />
      </StyledCreatePayable>
    </StyledModal>
  );
}
