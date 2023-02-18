import { TableFilter } from "../../TableProps";

export function selectFilter(
  name = "name",
  data: any[],
  placeholder = name,
  moreComponentProps: Partial<TableFilter> = {},
): TableFilter {
  return {
    name: name,
    type: "select",
    placeholder,
    componentProps: {
      data,
      ...moreComponentProps,
    },
  };
}
