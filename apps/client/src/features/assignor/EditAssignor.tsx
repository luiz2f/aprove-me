import styled from "styled-components";
import { useAssignor } from "./useAssignor";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { HiOutlineXMark } from "react-icons/hi2";
import { IconButton } from "../../ui/IconButton";
import { Info } from "../../ui/InfoDetails";
import { ISOtoStringDate } from "../../utils/ISOtoStringDate";
import { StyledModal } from "../../ui/StyledModal";
import Spinner from "../../ui/Spinner";
import AssignorForm from "./AssignorForm";
import { CreateEditBox } from "../../ui/CreateEdit/CreateEditBox";

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const Grid2C = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 8px;
`;

export default function EditAssignor({ openAssignor, onClose }) {
  const { assignor, isPending } = useAssignor();
  const { id, createdAt, updatedAt } = assignor || openAssignor || {};
  const ref = useOutsideClick(onClose);

  return (
    <StyledModal>
      {isPending ? (
        <Spinner />
      ) : (
        <CreateEditBox ref={ref}>
          <Flex>
            <h3>Editar cedente</h3>
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

          <AssignorForm openAssignor={assignor || openAssignor || {}} />
        </CreateEditBox>
      )}
    </StyledModal>
  );
}
