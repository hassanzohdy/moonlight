import { trans } from "@mongez/localization";
import { TableFilter } from "../../TableProps";

export function switchFilter(
  name = "name",
  label = name,
  moreComponentProps: Partial<TableFilter> = {},
): TableFilter {
  return {
    name: name,
    type: "switch",
    wrapperProps: {
      mt: 0,
    },
    componentProps: {
      label: trans(label),
      defaultValue: 1,
      ...moreComponentProps,
    },
  };
}
