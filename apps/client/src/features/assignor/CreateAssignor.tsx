import styled from "styled-components";
import FormRow, { Error } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";

const StyledCreateAssignor = styled.div`
  max-width: 400px;
  height: fit-content;
  color: #333;
  background-color: #fff;
  border: 1px solid #eaf1fc;
  padding: 48px;
  margin: auto;
  border-radius: 10px;
`;
const StyledTitleCreateAssignor = styled.div`
  font-size: 28px;
  margin-bottom: 28px;
  font-weight: 700;
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 36px;
`;
const Form = styled.form``;
function CreateAssignor() {
  const { register, handleSubmit, reset, formState } = useForm({});
  const { errors } = formState;
  function onSubmit(data) {
    console.log(data);
  }
  function onError(error) {
    // console.log(error);
  }

  // COLOCAR CPF CNPJ

  return (
    <StyledCreateAssignor>
      <StyledTitleCreateAssignor>
        Cadastrar novo cedente
      </StyledTitleCreateAssignor>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Nome" error={errors?.nome?.message}>
          <Input
            $error={errors?.nome?.message}
            type="text"
            id="nome"
            {...register("nome", {
              required: "Campo obrigatório",
            })}
          />
        </FormRow>

        <FormRow label="Documento" error={errors?.documento?.message}>
          <Input
            $error={errors?.documento?.message}
            type="text"
            id="documento"
            {...register("documento", {
              required: "Campo obrigatório",
              validate: FUNÇAO PRA VALIDAR CPF CNPJ,

              minLength: {
                value: 10,
                message: "Insira um CPF ou CNPJ válido",
              },
            })}
          />
        </FormRow>
        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            $error={errors?.email?.message}
            type="email"
            id="email"
            autoComplete="username"
            {...register("email", {
              required: "Campo obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Endereço de email invalido",
              },
            })}
          />
        </FormRow>
        <FormRow label="Telefone" error={errors?.telefone?.message}>
          <Input
            $error={errors?.telefone?.message}
            type="text"
            id="telefone"
            {...register("telefone", {
              required: "Campo obrigatório",
              minLength: {
                value: 10,
                message: "Insira um telefone válido: DDD + Número",
              },
            })}
          />
        </FormRow>

        <StyledButtonBox>
          <Button type="submit" size="large" $widthohp="true">
            Cadastrar
          </Button>
        </StyledButtonBox>
      </Form>
    </StyledCreateAssignor>
  );
}

export default CreateAssignor;
