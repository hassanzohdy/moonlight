import { TableFilter } from "../../TableProps";

export function selectLazyRequestFilter(
  name = "name",
  lazyRequest: any,
  placeholder = name,
  moreComponentProps: Partial<TableFilter> = {},
): TableFilter {
  return {
    name: name,
    type: "select",
    placeholder,
    componentProps: {
      lazyRequest,
      ...moreComponentProps,
    },
  };
}
