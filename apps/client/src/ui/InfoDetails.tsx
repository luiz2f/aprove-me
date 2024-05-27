import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  & div {
    font-weight: 400;
  }
  &.right {
    text-align: right;
  }
`;
export function Info({ children, title, ...props }) {
  return (
    <StyledTitle {...props}>
      {title}
      <div>{children}</div>
    </StyledTitle>
  );
}
