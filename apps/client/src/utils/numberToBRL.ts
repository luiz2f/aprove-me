export function numberToBRL(valor: number) {
  // Verifica se o valor é um número
  if (typeof valor !== "number") {
    return "Valor inválido";
  }

  // Formata o valor para o formato de moeda brasileira
  return (
    "R$ " +
    valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
