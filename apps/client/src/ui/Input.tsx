import styled, { css } from "styled-components";

const Input = styled.input`
  border: 1px solid #aeaeae;
  background-color: #fff;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;

  ${(props) =>
    props.$error &&
    css`
      border: 1px solid #c95454;
      background-color: #fff9f9;
    `}
`;
export default Input;
