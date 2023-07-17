import { NumberColumnFormatter } from "../Formatters";
import { tableColumn } from "./tableColumn";

export function numberColumn(key = "name", heading: string = key) {
  return tableColumn(key, heading).formatter(NumberColumnFormatter);
}
