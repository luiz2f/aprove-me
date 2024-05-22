import styled from "styled-components";
import Table from "../../ui/Table";
import PayableRow from "./PayableRow";
const fakeData = [
  {
    id: "09c8ff24-7936-4b02-8fa1-f139281a1d60",
    valor: 5367.48,
    nome: "João da Silva",
    outroId: "af051f4d-bf0f-4a84-8938-e58ed037ed6c",
    dataEmissao: "12/05/22",
  },
  {
    id: "d572d4b1-bc09-4375-9c12-b8e95b6d5ff3",
    valor: 2315.23,
    nome: "Maria dos Santos",
    outroId: "7fd4fde7-7cf4-4fb1-b7d1-724b4782d11d",
    dataEmissao: "25/09/21",
  },
  {
    id: "2072ab6a-cfbb-446f-9a71-5a1e6725aa57",
    valor: 8910.76,
    nome: "José da Silva",
    outroId: "ea3923cb-5246-4ef2-9f4f-868ed3172e48",
    dataEmissao: "03/11/23",
  },
  {
    id: "c30e77d9-81d2-4c79-aeb0-820b1dfb7cf7",
    valor: 4123.95,
    nome: "Ana Paula Pereira",
    outroId: "318f9b1d-3804-41f8-b71d-faefc2c47834",
    dataEmissao: "17/07/22",
  },
  {
    id: "5e49bb16-19d3-45a0-8ae3-bd041739139f",
    valor: 7568.32,
    nome: "Carlos Eduardo Oliveira",
    outroId: "e04e6409-f836-4a8f-aa09-6d70ee1ab0b3",
    dataEmissao: "29/02/21",
  },
  {
    id: "fd44c9a5-c8cb-4a95-a6d5-d49c36a6e3c0",
    valor: 1742.11,
    nome: "Francisco José Almeida",
    outroId: "722d7c7d-21b5-4f6e-a36a-b2f0110f23e2",
    dataEmissao: "10/08/23",
  },
  {
    id: "c3050cbf-b24d-42a1-bb29-89cb30d105c3",
    valor: 6667.78,
    nome: "Paula Cristina Oliveira",
    outroId: "9e88e99a-91f2-4c94-b55f-bb9bb423f2a1",
    dataEmissao: "08/04/20",
  },
  {
    id: "2de7aa33-1d35-4c12-925f-1f16d6bb11d4",
    valor: 3198.54,
    nome: "Luiz Carlos Silva",
    outroId: "f6849a13-0a3d-42ad-9f1d-f96e47305e5f",
    dataEmissao: "21/10/22",
  },
  {
    id: "91d3e749-1488-4f14-a805-46a757b769bb",
    valor: 5943.27,
    nome: "Sandra Maria Gonçalves",
    outroId: "b1a9d9c7-49f7-4629-bbc5-8706a6c50295",
    dataEmissao: "14/06/21",
  },
  {
    id: "3670da33-490f-405f-831b-0ebf394f2598",
    valor: 2314.89,
    nome: "Pedro Henrique Alves",
    outroId: "923b65e1-ee50-4b19-a85b-4892019d68f9",
    dataEmissao: "09/03/23",
  },
  {
    id: "4cf15789-002e-4897-92b2-6717cc0403d8",
    valor: 1093.75,
    nome: "Fernanda Silva Santos",
    outroId: "a29cd857-1c2c-4c8f-a60a-cfc98ac12f51",
    dataEmissao: "27/12/20",
  },
  {
    id: "7236a6f1-5933-44e2-a784-6d10b2072b0d",
    valor: 7580.46,
    nome: "Lucas da Silva",
    outroId: "b7275b7b-9eeb-4d5e-97fb-7357f47a22e3",
    dataEmissao: "05/01/22",
  },
  {
    id: "1443a26e-d94d-49cd-86f3-73db9b8dd4aa",
    valor: 5812.99,
    nome: "Cláudia Oliveira Pereira",
    outroId: "f588fa9a-66d2-4d8f-b07b-af87fd8f3f8c",
    dataEmissao: "19/07/21",
  },
  {
    id: "28a3ef45-40bb-4c09-87f9-4d255472b034",
    valor: 3956.72,
    nome: "Rafael da Costa",
    outroId: "50a0ff39-0e94-43a0-9de5-46f876a8e595",
    dataEmissao: "23/05/23",
  },
  {
    id: "0809fe2d-5a0a-4b9d-8517-bad39e83e76d",
    valor: 2334.67,
    nome: "Carla da Silva",
    outroId: "8edee558-9309-422e-9507-1db102f48c38",
    dataEmissao: "06/09/22",
  },
];
const StyledCenter = styled.div``;
function PayableTable() {
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
          data={fakeData}
          render={(payable) => (
            <PayableRow key={payable.id} payable={payable} />
          )}
        />
      </div>
    </Table>
  );
}

export default PayableTable;
