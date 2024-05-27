import React from "react";
import { HiChevronDown } from "react-icons/hi2";
import styled, { css } from "styled-components";

const Select = styled.select`
  font-family: "Nunito Sans";
  background-color: #fff;
  border-radius: 8px;
  padding: 14px 18px;
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  border: 1px solid #aeaeae;
  width: 100%;
  ${(props) =>
    props.$error &&
    css`
      border: 1px solid #c95454;
      background-color: #fff9f9;
    `}
`;
const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const Chevron = styled.div`
  font-size: 14px; /* Adjust size as needed */
  position: absolute;
  top: 50%;
  right: 18px;
  color: #333;
  pointer-events: none;
  z-index: 2;
  & svg {
    transform: translateY(-50%);
  }
`;

const ChevronIcon = () => (
  <Chevron>
    <HiChevronDown />
  </Chevron>
);

const StyledSelect = React.forwardRef(({ error, children, ...props }, ref) => (
  <SelectContainer>
    <Select ref={ref} $error={error} {...props}>
      {children}
    </Select>
    <ChevronIcon />
  </SelectContainer>
));

export default StyledSelect;
