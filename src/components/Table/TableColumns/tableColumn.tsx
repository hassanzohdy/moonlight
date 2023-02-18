import React from "react";
import { Column } from "../Column";
import { TableColumn, TableColumnFormatter } from "../TableProps";

export function tableColumn(
  heading: React.ReactNode = "name",
  key: string = heading as string,
  formatter?: TableColumnFormatter,
): TableColumn {
  return new Column(key, heading).formatter(formatter);
}
