import styled, { css } from "styled-components";
import React from "react";

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

const InputDate = React.forwardRef(({ ...props }, ref) => {
  function calendarShowPicker(e) {
    e?.target?.showPicker();
  }

  return (
    <Input
      ref={ref}
      type="date"
      onClick={(e) => calendarShowPicker(e)}
      onFocus={(e) => calendarShowPicker(e)}
      {...props}
    />
  );
});

export default InputDate;
