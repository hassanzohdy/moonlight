import React from "react";
import { currentLocaleCode } from "../../../utils";
import { ImageFormatter } from "../Formatters";
import { tableColumn } from "./tableColumn";

export function circleImage(
  key: string,
  heading: React.ReactNode = "image",
  settings?: any,
) {
  return tableColumn(key, heading).formatter(ImageFormatter).settings(settings);
}

export function localizedCircleImage(
  key: string,
  heading: React.ReactNode = "image",
) {
  return circleImage(key, heading, {
    url: row => {
      const image = row.image || {};

      if (Array.isArray(image)) {
        const localeCode = currentLocaleCode();
        return image.find(singleImage => singleImage.localeCode === localeCode)
          ?.value?.url;
      }

      return image?.url;
    },
  });
}
