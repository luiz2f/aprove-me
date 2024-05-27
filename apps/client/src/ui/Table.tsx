import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  font-family: "Nunito Sans", sans-serif;
  border: 1px solid #eaf1fc;
  color: #333;
  font-size: 1.2rem;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0 0 20px #00000012;
`;

interface CommonRowProps {
  $columns: string;
}

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 18px 36px;
  padding-bottom: 14px;
  background-color: #f3f6fa;
  border-bottom: 1px solid #eaf1fc;
  letter-spacing: 0.4px;
  font-weight: 600;
  font-size: 20px;
`;

const StyledRow = styled(CommonRow)`
  padding: 10px 36px;
  transition: all 150ms;
  &:not(:last-child) {
    border-bottom: 1px solid #eaf1fc;
  }
  &:hover {
    background-color: #f8fafc;
  }
  &:active {
    background-color: #eaf1fc;
  }
  cursor: pointer;
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
const TableContext = createContext();

function Table({
  $columns,
  children,
}: {
  $columns: string;
  children: React.ReactNode;
}) {
  return (
    <TableContext.Provider value={{ $columns }}>
      <StyledTable role="table"> {children}</StyledTable>
    </TableContext.Provider>
  );
}
function Header({ children }: { children: React.ReactNode }) {
  const { $columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={$columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const { $columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={$columns} onClick={onClick}>
      {children}
    </StyledRow>
  );
}
function Body({
  data,
  render,
}: {
  data: any[];
  render: (item: any) => React.ReactNode;
}) {
  return <>{data.map(render)}</>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
