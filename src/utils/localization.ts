import { getMoonlightConfig } from "../config";
import { currentLocaleCode } from "./helpers";

export function getLocalizedValue(
  value: any,
  localeCode: string = currentLocaleCode(),
  localeCodeKey = "localeCode",
  textKey = "text",
) {
  if (!value) return "";

  if (value[localeCode]) return value[localeCode];

  if (Array.isArray(value)) {
    return value.find(item => item[localeCodeKey] === localeCode)?.[textKey];
  }

  return value;
}

export function multiLingualName(
  name = "",
  localeCodeIndex = 0,
  textKey = "text",
) {
  if (!name) return "";

  return `${name}.${localeCodeIndex}.${textKey}`; // name.0.text
}

export type LocaleCode = {
  localeCode: string;
  direction: "ltr" | "rtl";
  name: string;
  flag?: string;
};

export function getLocaleCodes() {
  const localeCodes: LocaleCode[] = [];
  const localeCodesList: any = getMoonlightConfig("localeCodes", {});
  for (const localeCode in localeCodesList) {
    localeCodes.push({
      localeCode,
      ...(localeCodesList[localeCode] as any),
    });
  }

  const localeCode = currentLocaleCode();

  // order locale codes by current locale code
  localeCodes.sort((a, b) => {
    if (a.localeCode === localeCode) return -1;
    if (b.localeCode === localeCode) return 1;
    return 0;
  });

  return localeCodes;
}
