import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f3f6fa;
  text-align: center;
`;
export const LoginBox = styled.div`
  color: #333;
  transition: all 200ms ease;
  display: grid;
  grid-template-columns: 1fr 1fr;
  display: grid;
  background-color: #fff;
  box-shadow: 0 0 20px #00000012;
  position: relative;
  overflow: hidden;
  width: 440px;
  .signup & {
    color: #fff;
    background-color: #0a36b0;
  }
`;
export const Slider = styled.div`
  display: flex;
  transition: all 400ms ease;
  .slide & {
    transform: translateX(-50%);
  }
`;
export const LogSigBox = styled.div`
  padding: 48px;
  padding-bottom: 36px;
  display: flex;
  align-items: center;
  flex-direction: column;
  &.signup {
    background-color: #0a36b0;
    color: #fff;
  }
  & h3 {
    font-weight: 700;
    font-size: 24px;
  }
  & p {
    font-size: 16px;
    margin-bottom: 64px;
  }
`;
export const LogoHolder = styled.div`
  height: 80px;
  width: 80px;
  padding: 24px;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 12px;
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  .signup & {
    color: #fff;
    background-color: #fff;
  }
  & img {
    height: 74px;
    width: fit-content;
    padding-top: 4px;
  }
`;
export const LoginInput = styled.input`
  border: 1px solid #aeaeae;
  font-size: 16px;
  border-radius: 10px;
  width: 300px;
  padding: 14px 20px;
  font-weight: 500;

  ${(props) =>
    props.$error &&
    css`
      border: 1px solid #c95454;
      background-color: #fff9f9;
    `}
  &:not(:first-child) {
    margin-top: 16px;
  }
  .signup & {
    color: #fff;
    background-color: #0a36b0;
    border: 1px solid #eee;
    &::placeholder {
      color: #eeeeee8f;
    }
    ${(props) =>
      props.$error &&
      css`
        border: 1px solid #ecb3b3;
        background-color: #ff3e3e52;
        &::placeholder {
          color: #ecb3b3;
        }
      `}
  }
  &::placeholder {
    color: #aeaeae;
  }
`;
export const LoginButton = styled.button`
  color: #fff;
  background-color: #0a36b0;
  border: 1px solid #0a36b0;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  width: 346px;
  padding: 18px 20px;
  margin-top: 24px;
  margin-bottom: 24px;
  cursor: pointer;
  .signup & {
    color: #0a36b0;
    background-color: #fff;
    border: 1px solid #fff;
  }
`;
export const LoginNavLink = styled(NavLink)`
  &:link,
  &:visited {
    border: none;
    background-color: transparent;
    text-decoration: underline;
    color: #005fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    width: max-content;
    margin: auto;
    .signup & {
      color: #b4dd22;
    }
  }
`;
export const LoginErrorMessage = styled.div`
  color: #ecbebe;
  display: flex;
  font-weight: 500;
  padding-left: 20px;
  padding-top: 4px;
`;
