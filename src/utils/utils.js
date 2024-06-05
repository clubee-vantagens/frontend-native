export function maskCpf(cpf) {
    const digits = cpf.replace(/\D/g, '');

    let masked = digits;
    if(digits.length > 3) {
        masked = digits.slice(0,3) + "." + digits.slice(3);
    }
    if(digits.length > 6) {
        masked = masked.slice(0,7) + "." + masked.slice(7);
    }
    if(digits.length > 9) {
        masked = masked.slice(0,11) + "-" + masked.slice(11)
    }

    return masked.slice(0,14)
}