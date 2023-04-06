import { trans } from "@mongez/localization";
import { TableFilter } from "../../TableProps";

export function emailFilter(name = "email", placeholder = name): TableFilter {
  return {
    type: "email",
    name: name,
    placeholder: trans(placeholder),
  };
}
