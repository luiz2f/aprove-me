import Table from "../../ui/Table";
import AssignorRow from "./AssignorRow";
import { useAssignors } from "./useAssignors";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menu";

function AssignorTable() {
  const { isPending, assignors } = useAssignors();

  if (isPending) {
    return <Spinner />;
  }
  return (
    <Menus>
      <Table $columns="2.5fr 2.2fr 1fr 1.4fr 34px">
        <Table.Header>
          <div>ID do Cedente</div>
          <div>Nome</div>
          <div>Documento</div>
          <div>Contato</div>
          <div></div>
        </Table.Header>
        <div>
          {assignors ? (
            <Table.Body
              data={assignors}
              render={(assignor) => (
                <AssignorRow key={assignor.id} assignor={assignor} />
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

export default AssignorTable;
