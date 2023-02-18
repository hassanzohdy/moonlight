import { BooleanValue } from "../../Common/BooleanValue";
import { FormatterProps } from "../TableProps";

export function BooleanFormatter({ value }: FormatterProps) {
  return <BooleanValue value={value} />;
}
