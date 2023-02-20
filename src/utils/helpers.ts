import { getMoonlightConfig } from "../config";

export function money(value: any) {
  if (!value) return value;

  return Number(value).toLocaleString();
}

export function currentDirection() {
  return getMoonlightConfig("current.direction")?.() || "ltr";
}

export function currentLocaleCode() {
  return getMoonlightConfig("current.localeCode")?.() || "en";
}
