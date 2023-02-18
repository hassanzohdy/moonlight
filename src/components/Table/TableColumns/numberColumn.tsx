import { FormatterProps } from "../TableProps";
import { tableColumn } from "./tableColumn";

export function numberColumn(key = "name", heading: string = key) {
  return tableColumn(key, heading).formatter(({ value }: FormatterProps) =>
    // new Intl.NumberFormat().format(Number(value)),
    new Number(value).toLocaleString(),
  );
}
