export function formatPhoneNumber(phoneNumber: string) {
  // Remove todos os caracteres que não são dígitos
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // Captura os dois primeiros dígitos e os próximos 4 dígitos, separando-os por '-'
  const formatted = cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

  return formatted;
}
