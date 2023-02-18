import { MantineColor } from "@mantine/core";
import { StatusFormatter } from "../Formatters";
import { TableColumn } from "../TableProps";
import { tableColumn } from "./tableColumn";

export function statusColumn(
  heading: string,
  key: string,
  statuses: Record<string, MantineColor>,
  moreSettings = {},
): TableColumn {
  return tableColumn(key, heading)
    .formatter(StatusFormatter)
    .settings({
      statuses,
      ...moreSettings,
    });
}
