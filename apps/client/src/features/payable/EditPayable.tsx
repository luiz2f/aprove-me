import styled from "styled-components";
import { HiOutlineXMark } from "react-icons/hi2";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ISOtoStringDate } from "../../utils/ISOtoStringDate";
import { Info } from "../../ui/InfoDetails";
import { StyledModal } from "../../ui/StyledModal";
import { IconButton } from "../../ui/IconButton";
import { usePayable } from "./usePayable";
import Spinner from "../../ui/Spinner";
import { useAssignorsList } from "../assignor/useAssignorsList";
import PayableForm from "./PayableForm";
import { CreateEditBox } from "../../ui/CreateEdit/CreateEditBox";

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
  margin-bottom: 24px;
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
        <CreateEditBox ref={ref}>
          <Flex>
            <h3>Recebível</h3>
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
        </CreateEditBox>
      )}
    </StyledModal>
  );
}
