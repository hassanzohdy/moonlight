import { getMoonlightConfig } from "../config";

export function money(value: any) {
  if (!value) return value;

  return Number(value).toLocaleString();
}

export function currentDirection() {
  const direction = getMoonlightConfig("current.direction");

  if (direction) return direction();

  if (getMoonlightConfig("current.autoDetect") === false) return "ltr";

  return document.documentElement.dir || "ltr";
}

export function currentLocaleCode() {
  const localeCode = getMoonlightConfig("current.localeCode");

  if (localeCode) return localeCode();

  if (getMoonlightConfig("current.autoDetect") === false) return "en";

  return document.documentElement.lang || "en";
}

const isMacOS = navigator.userAgent.match(/mac/i);

export function modButtons(buttons: string[]) {
  return `(${[isMacOS ? "⌘" : "Ctrl", ...buttons].join(" + ")})`;
}
