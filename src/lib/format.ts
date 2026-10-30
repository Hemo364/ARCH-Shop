const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));
}

// Uses a Latin comma on purpose, to keep prices looking as they always have on the site.
export function formatPrice(value: number): string {
  return toPersianDigits(value.toLocaleString("en-US"));
}

export function parseNumber(value: string): number {
  const digits = toLatinDigits(value).replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}
