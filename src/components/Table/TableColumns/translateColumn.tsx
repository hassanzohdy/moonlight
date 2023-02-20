import { trans } from "@mongez/localization";
import { FormatterProps } from "../TableProps";
import { tableColumn } from "./tableColumn";

export function translateColumn(key = "name", heading: string = key) {
  return tableColumn(key, heading).formatter(
    ({ value }: FormatterProps) => value && trans(value),
  );
}
