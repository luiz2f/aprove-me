import Table from "../../ui/Table";
import AssignorRow from "./AssignorRow";
import { useAssignors } from "./useAssignors";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menu";
import Pagination from "../../ui/Pagination";
import EditAssignor from "./EditAssignor";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function AssignorTable() {
  const { isPending, assignors, length } = useAssignors();
  const { id } = useParams(); // Obtém o parâmetro id da URL
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const openAssignor = assignors?.find((assignor) => assignor?.id === id);

  const handleModalClose = () => {
    navigate(`/cedentes?page=${page}`);
  };

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
      <Pagination count={length} />
      {id ? (
        <EditAssignor openAssignor={openAssignor} onClose={handleModalClose} />
      ) : (
        ""
      )}
    </Menus>
  );
}

export default AssignorTable;
