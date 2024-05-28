import styled from "styled-components";
import { Button } from "./Button";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  border: 1px solid #eaf1fc;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px #00000012;

  padding: 32px 40px;
  transition: all 0.5s;
`;
const StyledConfirmDelete = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & p {
    color: #333;
    margin-bottom: 12px;
  }

  & div {
    display: flex;
    width: 100%;
    justify-content: space-between;

    gap: 12px;
  }
`;
const Heading = styled.div`
  color: #333;
  font-size: 24px;
  font-weight: 700;
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  function handleClick(event) {
    event.stopPropagation(); // Impede a propagação do evento de clique para elementos pai
  }
  return (
    <StyledModal onClick={handleClick}>
      <StyledConfirmDelete>
        <Heading as="h3">Deletar {resourceName}</Heading>
        <p>
          Tem certeza que deseja remover {resourceName} permanentemente? Isso
          não poderá ser desfeito.
        </p>

        <div>
          <Button type="secondary" disabled={disabled} onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button type="danger" disabled={disabled} onClick={onConfirm}>
            Deletar
          </Button>
        </div>
      </StyledConfirmDelete>
    </StyledModal>
  );
}

export default ConfirmDelete;
