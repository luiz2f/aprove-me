import styled from "styled-components";
import Table from "../../ui/Table.js";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";

const ID = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #333;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
    font-size: 14px;
    color: #333;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 14px;
    color: #333;
  }
`;

interface Assignor {
  id: string;
  document: string;
  name: string;
  phone: string;
  email: string;
}

interface AssignorRowProps {
  assignor: Assignor;
}

function AssignorRow({ assignor }: AssignorRowProps) {
  const { id, document, name, phone, email } = assignor;
  return (
    <Table.Row>
      <ID>{id}</ID>
      <ID>{name}</ID>
      <ID>{document}</ID>
      <Stacked>
        <span>{formatPhoneNumber(phone)}</span>
        <span>{email}</span>
      </Stacked>

      <div>s</div>
      {/* <Modal>
        <Menus.Menu>
          <Menus.Toogle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check Out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={`booking #${bookingId} from ${guestName} `}
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal> */}
    </Table.Row>
  );
}

export default AssignorRow;
