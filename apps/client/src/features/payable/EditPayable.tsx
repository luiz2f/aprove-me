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
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePayable } from "./usePayable";
import Spinner from "../../ui/Spinner";
import { useAssignorsList } from "../assignor/useAssignorsList";
import PayableForm from "./PayableForm";

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
const Grid2C = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 8px;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

export default function EditPayable({ openPayable, onClose }) {
  const { payable, isPending } = usePayable();
  const { id, createdAt, updatedAt } = payable || openPayable || {};
  const { assignorIds } = useAssignorsList();
  const ref = useOutsideClick(onClose);

  return (
    <StyledModal>
      {isPending ? (
        <Spinner />
      ) : (
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
          <PayableForm
            openPayable={payable || openPayable || {}}
            assignorIds={assignorIds}
          />
        </StyledCreatePayable>
      )}
    </StyledModal>
  );
}
