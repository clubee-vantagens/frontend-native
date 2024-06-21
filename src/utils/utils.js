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

export function validateCpf(cpf) {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]/g, ""); // Remover espaços, pontos e traços

  if (
    !cpf ||
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }

  let soma = 0;
  let resto;
  
  // Verificação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  
  // Verificação do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
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

export function validaCNPJ(cnpj) {
	cnpj = cnpj.replace(/[^\d]+/g,'');
	if(cnpj == '' || cnpj.length != 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

	// Valida DVs
	let tamanho = cnpj.length - 2
	let numeros = cnpj.substring(0,tamanho);
	let digitos = cnpj.substring(tamanho);
	let soma = 0;
	let pos = tamanho - 7;
	for (let i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2) pos = 9;
	}
	let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(0)) return false;

	tamanho = tamanho + 1;
	numeros = cnpj.substring(0,tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (let i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2) pos = 9;
	}
	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(1)) return false;
	return true;
}
