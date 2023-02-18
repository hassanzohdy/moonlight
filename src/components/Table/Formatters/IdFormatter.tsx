import { tableColumn } from "../TableColumns/tableColumn";

export function idFormatter() {
  return tableColumn("id", "#").display("optional");
}
