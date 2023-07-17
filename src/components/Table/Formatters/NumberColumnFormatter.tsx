import { FormatterProps } from "../TableProps";

export const NumberColumnFormatter = ({ value }: FormatterProps) =>
  // new Intl.NumberFormat().format(Number(value)),
  value ? new Number(value).toLocaleString() : value;
