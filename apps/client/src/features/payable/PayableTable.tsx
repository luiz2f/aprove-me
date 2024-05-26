import styled from "styled-components";
import Table from "../../ui/Table";
import PayableRow from "./PayableRow";
import { usePayables } from "./usePayables";
import Spinner from "../../ui/Spinner";

const StyledCenter = styled.div``;

function PayableTable() {
  const { isPending, payables } = usePayables();

  if (isPending) {
    return <Spinner />;
  }
  return (
    <Table $columns="2fr 1fr 1fr 10px">
      <Table.Header>
        <StyledCenter>ID do Recebível</StyledCenter>
        <StyledCenter>Valor</StyledCenter>
        <StyledCenter>Emissão</StyledCenter>
        <div>a</div>
      </Table.Header>
      <div>
        <Table.Body
          data={payables}
          render={(payable) => (
            <PayableRow key={payable.id} payable={payable} />
          )}
        />
      </div>
    </Table>
  );
}

export default PayableTable;
