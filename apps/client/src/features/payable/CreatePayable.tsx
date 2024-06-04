import styled from "styled-components";
import { StyledModal } from "../../ui/StyledModal";
import { useAssignorsList } from "../assignor/useAssignorsList";
import { useContext } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ModalContext } from "../../ui/Modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { IconButton } from "../../ui/IconButton";
import PayableForm from "./PayableForm";
import { CreateEditBox } from "../../ui/CreateEdit/CreateEditBox";

const StyledTitleCreatePayable = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export default function CreatePayable() {
  const { assignorIds } = useAssignorsList();
  const { close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  return (
    <StyledModal>
      <CreateEditBox ref={ref}>
        <Flex>
          <h3>Cadastrar novo recebível</h3>
          <IconButton onClick={close}>
            <HiOutlineXMark />
          </IconButton>
        </Flex>
        <PayableForm assignorIds={assignorIds} openPayable={null} createForm />
      </CreateEditBox>
    </StyledModal>
  );
}
