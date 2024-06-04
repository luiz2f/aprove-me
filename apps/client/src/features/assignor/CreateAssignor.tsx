import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import AssignorForm from "./AssignorForm";
import { StyledModal } from "../../ui/StyledModal";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { IconButton } from "../../ui/IconButton";
import { CreateEditBox } from "../../ui/CreateEdit/CreateEditBox";

const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export default function CreateAssignor() {
  const { close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  // COLOCAR CPF CNPJ

  return (
    <StyledModal>
      <CreateEditBox ref={ref}>
        <Flex>
          <h3> Cadastrar novo cedente</h3>
          <IconButton onClick={close}>
            <HiOutlineXMark />
          </IconButton>
        </Flex>
        <AssignorForm openAssignor={null} createForm />
      </CreateEditBox>
    </StyledModal>
  );
}
