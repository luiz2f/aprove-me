import styled, { css } from "styled-components";

const Input = styled.input`
  font-family: "Nunito Sans";

  border: 1px solid #aeaeae;
  background-color: #fff;
  border-radius: 8px;
  padding: 14px 18px;

  ${(props) =>
    props.$error &&
    css`
      border: 1px solid #c95454;
      background-color: #fff9f9;
    `}
  ${(props) =>
    props.disabled &&
    css`
      border: 1px solid #aeaeae;
      background-color: #f0f0f0;
    `}
`;
export default Input;
