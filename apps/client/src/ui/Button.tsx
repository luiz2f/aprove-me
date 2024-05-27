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
    background-color: #f8fafc;
    border: 1px solid #aeaeae;
    &:hover {
      background-color: #f1f5f9;
    }
  `,
  danger: css`
    color: #fff;
    background-color: #cc2929;

    &:hover {
      background-color: #c95454;
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
  ${(props) => variations[props.type]}
  ${(props) => sizes[props.size]}

  ${(props) =>
    props.$widthohp === "true" &&
    `
    width: 100%;
  `}
`;
Button.defaultProps = {
  type: "primary",
  sizes: "medium",
  $widthohp: "false",
};
