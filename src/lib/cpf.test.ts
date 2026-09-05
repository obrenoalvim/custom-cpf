import { describe, it, expect } from 'vitest';
import { calculateCheckDigits, isRepeatedDigits, validateCPF, formatCPF } from './cpf';

describe('calculateCheckDigits', () => {
  it('computes the two check digits for a known valid CPF', () => {
    expect(calculateCheckDigits('111444777'.split(''))).toEqual([3, 5]);
  });

  it('computes 0 for both check digits when the remainder is below 2', () => {
    expect(calculateCheckDigits('123456789'.split(''))).toEqual([0, 9]);
  });
});

describe('isRepeatedDigits', () => {
  it('detects all-equal digit sequences', () => {
    expect(isRepeatedDigits('11111111111'.split(''))).toBe(true);
    expect(isRepeatedDigits('00000000000'.split(''))).toBe(true);
  });

  it('returns false for a normal sequence', () => {
    expect(isRepeatedDigits('11144477735'.split(''))).toBe(false);
  });
});

describe('validateCPF', () => {
  it('accepts a known valid CPF, formatted or not', () => {
    expect(validateCPF('111.444.777-35')).toBe(true);
    expect(validateCPF('11144477735')).toBe(true);
  });

  it('rejects a CPF with a wrong check digit', () => {
    expect(validateCPF('111.444.777-36')).toBe(false);
  });

  it('rejects an all-repeated-digit CPF even though the checksum passes', () => {
    expect(validateCPF('111.111.111-11')).toBe(false);
    expect(validateCPF('000.000.000-00')).toBe(false);
  });

  it('rejects a CPF with the wrong number of digits', () => {
    expect(validateCPF('123.456.789-0')).toBe(false);
    expect(validateCPF('')).toBe(false);
  });
});

describe('formatCPF', () => {
  it('inserts the standard dots and dash', () => {
    expect(formatCPF('11144477735')).toBe('111.444.777-35');
  });
});
