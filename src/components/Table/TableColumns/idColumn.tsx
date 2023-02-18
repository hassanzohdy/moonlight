import { tableColumn } from "./tableColumn";

export function idColumn() {
  return tableColumn("id", "id").display("optional").sortable();
}
