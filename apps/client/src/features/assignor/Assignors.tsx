import styled from "styled-components";
import AssignorTable from "./AssignorTable";
import { Button } from "../../ui/Button";
import CreateAssignor from "./CreateAssignor";
import Modal from "../../ui/Modal";

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

function Assignors() {
  return (
    <Modal>
      <Padding>
        <Flex>
          <Active>Cedentes </Active>
          {/* <SearchBar>
          <SearchBarInput></SearchBarInput>
        </SearchBar> */}
          <Modal.Open opens="createAssignor">
            <Button>Criar novo</Button>
          </Modal.Open>
        </Flex>
        <AssignorTable />
      </Padding>
      <Modal.Window name="createAssignor">
        <CreateAssignor />
      </Modal.Window>
    </Modal>
  );
}

export default Assignors;
