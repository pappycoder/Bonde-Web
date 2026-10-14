/**
 * Lightweight client-side checks that mirror the backend DTO rules. They are a
 * UX convenience only — the backend remains the source of truth and re-validates
 * every submission.
 */

// Pragmatic email shape check: something@something.tld with no whitespace.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function required(value: string): boolean {
  return value.trim().length > 0;
}

export function maxLength(value: string, limit: number): boolean {
  return value.length <= limit;
}
