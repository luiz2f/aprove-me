import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(2turn)
  }
`;

const Spinner = styled.div`
  margin: 48px auto;

  width: 64px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #0a36b0 94%, #0000) top/10px 10px no-repeat,
    conic-gradient(#0000 30%, #0a36b0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

export default Spinner;
