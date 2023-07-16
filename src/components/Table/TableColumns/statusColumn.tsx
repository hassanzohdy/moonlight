import { MantineColor } from "@mantine/core";
import React from "react";
import { StatusFormatter } from "../Formatters";
import { TableColumn } from "../TableProps";
import { tableColumn } from "./tableColumn";

export type StatusColumnSettings = {
  content?: (row: any) => React.ReactNode;
};

export function statusColumn(
  heading: string,
  key: string,
  statuses: Record<string, MantineColor>,
  moreSettings: StatusColumnSettings = {},
): TableColumn {
  return tableColumn(key, heading)
    .formatter(StatusFormatter)
    .settings({
      statuses,
      ...moreSettings,
    });
}
