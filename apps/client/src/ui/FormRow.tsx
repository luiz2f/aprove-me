import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 0;
`;

const Label = styled.label`
  font-weight: 400;
  color: #333;
`;

export const Error = styled.span`
  font-size: 16px;
  color: #c95454;
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
