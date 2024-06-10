export function maskCpf(cpf) {
  const digits = cpf.replace(/\D/g, "");

  let masked = digits;
  if (digits.length > 3) {
    masked = digits.slice(0, 3) + "." + digits.slice(3);
  }
  if (digits.length > 6) {
    masked = masked.slice(0, 7) + "." + masked.slice(7);
  }
  if (digits.length > 9) {
    masked = masked.slice(0, 11) + "-" + masked.slice(11);
  }

  return masked.slice(0, 14);
}

export function maskCnpj(cnpj) {
  const digits = cnpj.replace(/\D/g, "");

  let masked = digits;
  if (digits.length > 2) {
    masked = digits.slice(0, 2) + "." + digits.slice(2);
  }
  if (digits.length > 5) {
    masked = masked.slice(0, 6) + "." + masked.slice(6);
  }
  if (digits.length > 8) {
    masked = masked.slice(0, 10) + "/" + masked.slice(10);
  }
  if (digits.length > 12) {
    masked = masked.slice(0, 15) + "-" + masked.slice(15);
  }

  return masked.slice(0, 18);
}
