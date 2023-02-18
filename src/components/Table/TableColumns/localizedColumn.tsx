import React from "react";
import { getLocalizedValue } from "../../../utils/localization";
import { FormatterProps } from "../TableProps";
import { tableColumn } from "./tableColumn";

export function localizedColumn(
  column: string,
  heading: React.ReactNode = column,
) {
  return tableColumn(column, heading).formatter(({ value }: FormatterProps) => {
    return getLocalizedValue(value);
  });
}
