import styled from "styled-components";
import PayableTable from "./PayableTable";
import { Button } from "../../ui/Button";

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

function Payables() {
  return (
    <>
      <Flex>
        <Active>Recebíveis </Active>
        {/* <SearchBar>
          <SearchBarInput></SearchBarInput>
        </SearchBar> */}
        <Button>Criar novo</Button>
      </Flex>
      <PayableTable />
    </>
  );
}

export default Payables;
