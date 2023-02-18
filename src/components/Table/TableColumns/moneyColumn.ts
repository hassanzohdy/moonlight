import { FormatterProps } from "../TableProps";
import { tableColumn } from "./tableColumn";

export function moneyColumn(key = "name", heading: string = key) {
  return tableColumn(key, heading).formatter(({ value }: FormatterProps) =>
    new Intl.NumberFormat("en-US", {
      currency: "USD",
      style: "currency",
    }).format(Number(value)),
  );
}
