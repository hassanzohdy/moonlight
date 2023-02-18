import { trans } from "@mongez/localization";
import { TableFilter } from "../../TableProps";

export function textFilter(name = "name", placeholder = name): TableFilter {
  return {
    type: "text",
    name: name,
    placeholder: trans(placeholder),
  };
}
