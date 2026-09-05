export function calculateCheckDigits(digits: string[]): [number, number] {
  let sum1 = 0;
  for (let i = 0; i < 9; i++) {
    sum1 += parseInt(digits[i]) * (10 - i);
  }
  const remainder1 = sum1 % 11;
  const digit1 = remainder1 < 2 ? 0 : 11 - remainder1;

  let sum2 = 0;
  for (let i = 0; i < 9; i++) {
    sum2 += parseInt(digits[i]) * (11 - i);
  }
  sum2 += digit1 * 2;
  const remainder2 = sum2 % 11;
  const digit2 = remainder2 < 2 ? 0 : 11 - remainder2;

  return [digit1, digit2];
}

export function isRepeatedDigits(digits: string[]): boolean {
  return digits.every(d => d === digits[0]);
}

export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  const digits = cleanCPF.split('');
  const [expectedDigit1, expectedDigit2] = calculateCheckDigits(digits);

  return parseInt(digits[9]) === expectedDigit1 && parseInt(digits[10]) === expectedDigit2;
}

export function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
