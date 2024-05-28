import Table from "../../ui/Table";
import PayableRow from "./PayableRow";
import { usePayables } from "./usePayables";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menu";

function PayableTable() {
  const { isPending, payables } = usePayables();

  if (isPending) {
    return <Spinner />;
  }
  return (
    <Menus>
      <Table $columns="2fr 1fr 1fr 34px">
        <Table.Header>
          <div>ID do Recebível</div>
          <div>Valor</div>
          <div>Emissão</div>
          <div></div>
        </Table.Header>
        <div>
          {payables ? (
            <Table.Body
              data={payables}
              render={(payable) => (
                <PayableRow key={payable.id} payable={payable} />
              )}
            />
          ) : (
            ""
          )}
        </div>
      </Table>
    </Menus>
  );
}

export default PayableTable;
