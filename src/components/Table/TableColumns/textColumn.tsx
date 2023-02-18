import { tableColumn } from "./tableColumn";

export function textColumn(key = "name", heading: string = key) {
  return tableColumn(key, heading);
}
