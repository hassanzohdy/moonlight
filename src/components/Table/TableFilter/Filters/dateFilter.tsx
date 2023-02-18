import { TableFilter } from "../../TableProps";

export function dataFilter(name = "name", placeholder = name): TableFilter {
  return {
    type: "date",
    name: name,
    placeholder,
  };
}
