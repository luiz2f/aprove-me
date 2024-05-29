import Table from "../../ui/Table";
import PayableRow from "./PayableRow";
import { usePayables } from "./usePayables";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menu";
import Pagination from "../../ui/Pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import EditPayable from "./EditPayable";

function PayableTable() {
  const { isPending, payables, findPayable, count } = usePayables();
  const { id } = useParams(); // Obtém o parâmetro id da URL
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const openPayable = findPayable?.find((payable) => payable?.id === id);
  const handleModalClose = () => {
    navigate(`/recebiveis?page=${page}`);
  };
  console.log(openPayable);

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
      <Pagination count={count} />
      {id && <EditPayable payable={openPayable} onClose={handleModalClose} />}
    </Menus>
  );
}

export default PayableTable;
