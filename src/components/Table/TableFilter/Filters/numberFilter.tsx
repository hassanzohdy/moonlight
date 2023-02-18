import { TableFilter } from "../../TableProps";

export function numberFilter(name = "name", placeholder = name): TableFilter {
  return {
    type: "number",
    name: name,
    placeholder,
  };
}
