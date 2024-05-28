import styled from "styled-components";
import PayableTable from "./PayableTable";
import { Button } from "../../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreatePayableForm from "./CreatePayableForm";

const Active = styled.div`
  color: #333;
  font-weight: 700;
  font-size: 28px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;
// const SearchBar = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 14px;
// `;
// const SearchBarInput = styled.input`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 14px;
// `;
const Padding = styled.div`
  padding: 48px;
`;

function Payables() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Modal>
        <Padding>
          {/* <CreatePayableForm /> */}
          <Flex>
            <Active>Recebíveis </Active>
            {/* <SearchBar>
          <SearchBarInput></SearchBarInput>
        </SearchBar> */}
            <Modal.Open opens="createPayable">
              <Button onClick={() => navigate("new")}>Criar novo</Button>
            </Modal.Open>
          </Flex>
          <PayableTable />
        </Padding>
        <Modal.Window name="createPayable">
          <CreatePayableForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default Payables;
