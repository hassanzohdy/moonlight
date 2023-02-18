import { TableFilter } from "../../TableProps";

export function selectSearchRequestFilter(
  name = "name",
  searchRequest: any,
  placeholder = name,
  moreComponentProps: Partial<TableFilter> = {},
): TableFilter {
  return {
    name: name,
    type: "select",
    placeholder,
    componentProps: {
      searchRequest,
      ...moreComponentProps,
    },
  };
}
