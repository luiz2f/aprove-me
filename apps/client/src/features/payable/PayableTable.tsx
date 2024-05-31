import Table from "../../ui/Table";
import PayableRow from "./PayableRow";
import { usePayables } from "./usePayables";
import { usePayable } from "./usePayable";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menu";
import Pagination from "../../ui/Pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import EditPayable from "./EditPayable";
import { useEffect } from "react";

function PayableTable() {
  const { isPending, payables, length } = usePayables();
  const { id } = useParams(); // Obtém o parâmetro id da URL
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const openPayable = payables?.find((payable) => payable?.id === id);
  const handleModalClose = () => {
    navigate(`/recebiveis?page=${page}`);
  };

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
      <Pagination count={length} />
      {id ? (
        <EditPayable openPayable={openPayable} onClose={handleModalClose} />
      ) : (
        ""
      )}
    </Menus>
  );
}

export default PayableTable;
