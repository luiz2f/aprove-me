import styled from "styled-components";

export const IconButton = styled.button`
  color: #555;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  padding: 6px 6px 3px 6px;
  transition: all 200ms;
  cursor: pointer;
  &:hover {
    color: #0a36b0;
  }
  & svg {
    font-size: 20px;
  }
`;
