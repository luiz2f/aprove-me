import styled from "styled-components";

export const Button = styled.button`
  border: none;
  color: #fff;
  background-color: #0a36b0;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  padding: 12px 24px;
  transition: all 150ms;

  cursor: pointer;
  &:hover {
    background-color: #005fff;
  }
  &:active {
    background-color: #0a36b0;
  }
`;
