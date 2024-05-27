import styled from "styled-components";
import Table from "../../ui/Table";
import { numberToBRL } from "../../utils/numberToBRL";
import { ISOtoStringDate } from "../../utils/ISOtoStringDate";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menu";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import PayableDetails from "./PayablesDetails";
import { useEffect, useState } from "react";

const ID = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #333;
`;

// const Stacked = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.2rem;

//   & span:first-child {
//     font-weight: 500;
//     font-size: 14px;
//     color: #333;
//   }

//   & span:last-child {
//     color: var(--color-grey-500);
//     font-size: 12px;
//     color: #a7a7a7;
//   }
// `;

const Date = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const Amount = styled.div`
  font-size: 16px;

  font-weight: 500;
  color: #333;
`;
interface Payable {
  id: string;
  valor: number;
  nome: string;
  outroId: string;
  emissionDate: string;
}

interface PayableRowProps {
  payable: Payable;
}

function PayableRow({ payable }: PayableRowProps) {
  const { id: payableId, value, emissionDate } = payable;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();

  const handleGoToPayable = () => {
    setModalOpen(true);
    navigate(`/recebiveis/${payableId}`);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/recebiveis");
  };

  useEffect(() => {
    if (id === payableId) {
      setModalOpen(true);
    }
  }, [id, payableId]);

  return (
    <Modal>
      <Table.Row onClick={() => handleGoToPayable()}>
        <ID>{payableId}</ID>

        <Amount>{numberToBRL(value)}</Amount>
        <Date>{ISOtoStringDate(emissionDate)}</Date>

        <Menus.Menu>
          <Menus.Toogle id={payableId} />
          <Menus.List id={payableId}>
            <Menus.Btn icon={<HiEye />} onClick={() => handleGoToPayable()}>
              Visualizar
            </Menus.Btn>

            <Modal.Open opens="delete">
              <Menus.Btn icon={<HiTrash />}>Delete</Menus.Btn>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          {/* <ConfirmDelete
            resourceName={`booking #${bookingId} from ${guestName} `}
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          /> */}
        </Modal.Window>
      </Table.Row>
      {(modalOpen || id) && (
        <PayableDetails payable={payable} onClose={handleModalClose} />
      )}
    </Modal>
  );
}

export default PayableRow;
