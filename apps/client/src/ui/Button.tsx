import styled, { css } from "styled-components";
const sizes = {
  small: css`
    font-size: 14px;
    padding: 8px 16px;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 16px;
    padding: 12px 24px;
    font-weight: 600;
  `,
  large: css`
    font-size: 18px;
    padding: 16px 32px;
    font-weight: 600;
  `,
};
const variations = {
  primary: css`
    color: #fff;
    background-color: #0a36b0;

    &:hover {
      background-color: #005fff;
    }
  `,
  secondary: css`
    color: #333;
    background-color: #EAF1FC

    &:hover {
      background-color:#EAF1FC
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

export const Button = styled.button`
  border: none;
  color: #fff;
  background-color: #0a36b0;
  font-size: 16px;

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
  ${(props) => variations[props.$variation]}
  ${(props) => sizes[props.size]}

  ${(props) =>
    props.$widthohp === "true" &&
    `
    width: 100%;
  `}
`;
Button.defaultProps = {
  $variation: "primary",
  sizes: "medium",
  $widthohp: "false",
};
