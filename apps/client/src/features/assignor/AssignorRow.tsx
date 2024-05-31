import styled from "styled-components";
import { HiEye, HiTrash } from "react-icons/hi2";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDeleteAssignor } from "./useDeleteAssignor";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menu";

const ID = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #333;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
    font-size: 14px;
    color: #333;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 14px;
    color: #333;
  }
`;

interface Assignor {
  id: string;
  document: string;
  name: string;
  phone: string;
  email: string;
}

interface AssignorRowProps {
  assignor: Assignor;
}

function AssignorRow({ assignor }: AssignorRowProps) {
  const { id: assignorId, document, name, phone, email } = assignor;
  const navigate = useNavigate();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { deleteAssignor, isDeleting, error } = useDeleteAssignor();
  const page = searchParams.get("page") || 1;

  const handleGoToAssignor = () => {
    setModalOpen(true);
    navigate(`/cedentes/${assignorId}?page=${page}`);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/cedentes");
  };

  return (
    <>
      <Table.Row onClick={() => handleGoToAssignor()}>
        <ID>{assignorId}</ID>
        <ID>{name}</ID>
        <ID>{document}</ID>
        <Stacked>
          <span>{formatPhoneNumber(phone)}</span>
          <span>{email}</span>
        </Stacked>

        <Menus.Menu>
          <Menus.Toogle id={assignorId} />
          <Menus.List id={assignorId}>
            <Menus.Btn icon={<HiEye />} onClick={() => handleGoToAssignor()}>
              Visualizar
            </Menus.Btn>
            <Modal.Open opens={`cedente${assignorId}`}>
              <Menus.Btn icon={<HiTrash />}>Apagar</Menus.Btn>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name={`cedente${assignorId}`}>
          <ConfirmDelete
            resourceName={`cedente: ${assignorId}`}
            onConfirm={() => deleteAssignor(assignorId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Table.Row>
    </>
  );
}

export default AssignorRow;
