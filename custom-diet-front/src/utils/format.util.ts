export const formatBusinessNumber = (value: string): string => {
  if (!value) return '';
  // Remove non-numeric characters
  const stripValue = value.replace(/\D/g, '');

  // Format as 123-45-12345
  if (stripValue.length > 3 && stripValue.length <= 5) {
    return `${stripValue.slice(0, 3)}-${stripValue.slice(3)}`;
  } else if (stripValue.length > 5) {
    return `${stripValue.slice(0, 3)}-${stripValue.slice(3, 5)}-${stripValue.slice(5, 10)}`;
  }

  return stripValue;
};

export function formatDecimal(
  value: number | string,
  decimals: number = 1
): string {
  if (value == null || value === '') return '';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '';

  if (Number.isInteger(num)) return num.toString();

  return parseFloat(num.toFixed(decimals)).toString();
}

export const formatCompanyNumber = (value: string): string => {
  if (!value) return '';
  // Remove non-numeric characters
  const stripValue = value.replace(/\D/g, '');

  // Format as 123456-1234567
  if (stripValue.length > 6) {
    return `${stripValue.slice(0, 6)}-${stripValue.slice(6, 13)}`;
  }

  return stripValue;
};
