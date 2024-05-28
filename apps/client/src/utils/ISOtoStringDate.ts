export function ISOtoStringDate(date: string, input: boolean = false) {
  const newDate = new Date(date);

  // Extrair os componentes da data no fuso horário UTC
  const day = newDate.getUTCDate();
  const month = newDate.getUTCMonth() + 1; // months are zero-indexed
  const year = newDate.getUTCFullYear();

  if (input) {
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  } else {
    return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
  }
}
