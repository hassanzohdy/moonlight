import { trans } from "@mongez/localization";
import { TableFilter } from "../../TableProps";

export function switchFilter(
  name = "name",
  label = trans(name),
  moreComponentProps: Partial<TableFilter> = {},
): TableFilter {
  return {
    name: name,
    type: "switch",
    wrapperProps: {
      mt: 0,
    },
    componentProps: {
      label,
      defaultValue: 1,
      ...moreComponentProps,
    },
  };
}
