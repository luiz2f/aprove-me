import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Button } from "./Button";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 4px;
  border-radius: 8px;
  transform: translateX(8px);
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    background-color: #fff;
    border: 1px solid #eaf1fc;
  }

  & svg {
    width: 24px;
    height: 24px;
    color: #333;
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: #fff;
  box-shadow: var(--shadow-md);
  border-radius: 8px;

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  & li:first-child button {
    border-radius: 8px 8px 0 0;
  }
  & li:last-child button {
    border-radius: 0 0 8px 8px;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    background-color: #f3f6fa;
  }

  & svg {
    width: 16px;
    height: 16px;
    color: #333;
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const [position, setPosition] = useState(null);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}
function Toogle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}
function Btn({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toogle = Toogle;
Menus.List = List;
Menus.Btn = Btn;

export default Menus;
