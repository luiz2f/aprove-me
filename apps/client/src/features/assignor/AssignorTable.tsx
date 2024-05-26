import styled from "styled-components";
import Table from "../../ui/Table";
import AssignorRow from "./AssignorRow";
import { useAssignors } from "./useAssignors";
import Spinner from "../../ui/Spinner";

// const fakeData = [
//   {
//     id: "1d9fd2f0-7985-499e-bd9a-3be543fa22db",
//     name: "Fulano Silva",
//     document: "12345678901",
//     email: "fulano@example.com",
//     phone: "9876543210",
//   },
//   {
//     id: "2c0b8cb7-0c7c-47cf-a4b2-8c5f2fbb89ef",
//     name: "Beltrano Oliveira",
//     document: "23456789012",
//     email: "beltrano@example.com",
//     phone: "8765432109",
//   },
//   {
//     id: "3d89cbee-d145-49fc-af36-6d9a9f4fd2fc",
//     name: "Ciclano Souza",
//     document: "34567890123",
//     email: "ciclano@example.com",
//     phone: "7654321098",
//   },
//   {
//     id: "4bba2427-d011-4d0a-9239-0765a3684be9",
//     name: "Doutrano Santos",
//     document: "45678901234",
//     email: "doutrano@example.com",
//     phone: "6543210987",
//   },
//   {
//     id: "5a7c755e-681b-4ef4-a6bb-32d64ad5d2c4",
//     name: "Entranho Almeida",
//     document: "56789012345",
//     email: "entranho@example.com",
//     phone: "5432109876",
//   },
//   {
//     id: "6d5b6324-66c0-40ad-89c7-28b059cd0802",
//     name: "Fulano Silva",
//     document: "67890123456",
//     email: "fulano@example.com",
//     phone: "4321098765",
//   },
//   {
//     id: "7e4e4468-47a2-4ff9-a55c-ba82512c90f9",
//     name: "Beltrano Oliveira",
//     document: "78901234567",
//     email: "beltrano@example.com",
//     phone: "3210987654",
//   },
//   {
//     id: "8a2a6633-78b2-4349-9b7c-0e07aa9352b7",
//     name: "Ciclano Souza",
//     document: "89012345678",
//     email: "ciclano@example.com",
//     phone: "2109876543",
//   },
//   {
//     id: "9bf0f724-1245-4d5f-8b93-4bf29b8d131e",
//     name: "Doutrano Santos",
//     document: "90123456789",
//     email: "doutrano@example.com",
//     phone: "1098765432",
//   },
//   {
//     id: "10e04b69-4c5a-4b5a-9d9b-99d93f5ac381",
//     name: "Entranho Almeida",
//     document: "01234567890",
//     email: "entranho@example.com",
//     phone: "0987654321",
//   },
//   {
//     id: "11a7b64d-ee18-47c7-8973-aaae50b50d44",
//     name: "Fulano Silva",
//     document: "12345678901",
//     email: "fulano@example.com",
//     phone: "9876543210",
//   },
//   {
//     id: "12dcf5e5-21a0-431e-a032-9fd23ff06ef5",
//     name: "Beltrano Oliveira",
//     document: "23456789012",
//     email: "beltrano@example.com",
//     phone: "8765432109",
//   },
//   {
//     id: "13ec7468-fdf0-4d7f-a7a0-6fca5f8b1d0e",
//     name: "Ciclano Souza",
//     document: "34567890123",
//     email: "ciclano@example.com",
//     phone: "7654321098",
//   },
//   {
//     id: "14c11415-ef12-4053-b0b0-2dcaaa3ff8c2",
//     name: "Doutrano Santos",
//     document: "45678901234",
//     email: "doutrano@example.com",
//     phone: "6543210987",
//   },
// ];
const StyledCenter = styled.div``;

function AssignorTable() {
  const { isPending, assignors } = useAssignors();

  if (isPending) {
    return <Spinner />;
  }
  return (
    <Table $columns="0.9fr .4fr 0.4fr .5fr 10px">
      <Table.Header>
        <StyledCenter>ID do Cedente</StyledCenter>
        <StyledCenter>Nome</StyledCenter>
        <StyledCenter>Documento</StyledCenter>
        <StyledCenter>Contato</StyledCenter>
        <div>a</div>
      </Table.Header>
      <div>
        <Table.Body
          data={assignors}
          render={(assignor) => (
            <AssignorRow key={assignor.id} assignor={assignor} />
          )}
        />
      </div>
    </Table>
  );
}

export default AssignorTable;
