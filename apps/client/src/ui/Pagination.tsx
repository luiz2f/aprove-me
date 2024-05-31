import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  color: #333;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  margin-top: 18px;

  font-size: 14px;
  margin-left: 8px;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 6px;
`;
const FakeButton = styled.div`
  background-color: transparent;
  border: none;

  color: #333;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 8px;
  transition: all 0.3s;
`;
const PaginationButton = styled.button`
  margin-top: 18px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: ${(props) =>
    props.$active ? "4px solid #0a36b0" : "4px solid transparent"};

  color: ${(props) => (props.$active ? "#0a36b0" : "#333")};
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  font-size: 16px;
  display: ${(props) => (props.disabled ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 8px;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 4px;
  }

  &:has(span:first-child) {
    padding-right: 4px;
  }

  & svg {
    height: 18px;
    width: 18px;
  }

  &:hover:not(:disabled) {
    background-color: #2756da;
    color: #fff;
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function goToPage(page) {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  const renderPageNumbers = () => {
    const pages = [];
    if (pageCount <= 8) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      const leftSide = Math.max(1, currentPage - 2);
      const rightSide = Math.min(pageCount, currentPage + 2);

      if (leftSide > 1) {
        pages.push(1, 2);
        if (leftSide > 3) pages.push("...");
      }

      for (let i = leftSide; i <= rightSide; i++) {
        pages.push(i);
      }

      if (rightSide < pageCount - 1) {
        if (rightSide < pageCount - 2) pages.push("...");
        pages.push(pageCount - 1, pageCount);
      }
    }
    return pages;
  };

  const pageNumbers = renderPageNumbers();

  return (
    <StyledPagination>
      <P>
        Página <span>{currentPage}</span> de <span>{pageCount}</span>
      </P>
      {pageCount > 1 && (
        <Buttons>
          <PaginationButton
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            <HiChevronDoubleLeft />
          </PaginationButton>
          <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
            <HiChevronLeft />
          </PaginationButton>
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <FakeButton>{page}</FakeButton>
            ) : (
              <PaginationButton
                key={index}
                $active={page === currentPage ? "yes" : ""}
                onClick={() => typeof page === "number" && goToPage(page)}
              >
                {page}
              </PaginationButton>
            )
          )}
          <PaginationButton
            onClick={nextPage}
            disabled={currentPage === pageCount}
          >
            <HiChevronRight />
          </PaginationButton>
          <PaginationButton
            onClick={() => goToPage(pageCount)}
            disabled={currentPage === pageCount}
          >
            <HiChevronDoubleRight />
          </PaginationButton>
        </Buttons>
      )}
    </StyledPagination>
  );
}

export default Pagination;
