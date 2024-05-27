export function ISOtoStringDate(date: string) {
  const formattedDate = new Date(date);

  const dia = formattedDate.getDate();
  const mes = formattedDate.getMonth() + 1;
  const ano = formattedDate.getFullYear();
  const dataFormatada = `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${ano}`;
  return dataFormatada;
}
