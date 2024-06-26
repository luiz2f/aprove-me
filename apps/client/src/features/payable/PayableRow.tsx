import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { HiEye, HiTrash } from "react-icons/hi2";
import { numberToBRL } from "../../utils/numberToBRL";
import { ISOtoStringDate } from "../../utils/ISOtoStringDate";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menu";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeletePayable } from "./useDeletePayable";

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
  const { deletePayable, isDeleting, error } = useDeletePayable();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const handleGoToPayable = () => {
    // navigate(`/recebiveis/${payableId}`);
    navigate(`/recebiveis/${payableId}?page=${page}`);
  };

  return (
    <>
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
            <Modal.Open opens={`recebivel${payableId}`}>
              <Menus.Btn icon={<HiTrash />}>Apagar</Menus.Btn>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name={`recebivel${payableId}`}>
          <ConfirmDelete
            resourceName={`recebível: ${payableId}`}
            onConfirm={() => deletePayable(payableId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Table.Row>
    </>
  );
}

export default PayableRow;
