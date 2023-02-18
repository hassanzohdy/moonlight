export function money(value: any) {
  if (!value) return value;

  return Number(value).toLocaleString();
}
