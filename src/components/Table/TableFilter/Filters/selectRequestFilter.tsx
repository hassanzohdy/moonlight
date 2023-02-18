import { TableFilter } from "../../TableProps";

export function selectRequestFilter(
  name = "name",
  request: any,
  placeholder = name,
  moreComponentProps: Partial<TableFilter> = {},
): TableFilter {
  return {
    name: name,
    type: "select",
    placeholder,
    componentProps: {
      request,
      ...moreComponentProps,
    },
  };
}
