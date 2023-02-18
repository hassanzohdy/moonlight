import React from "react";
import { BooleanFormatter } from "../Formatters";
import { tableColumn } from "./tableColumn";

export function booleanColumn(
  key = "published",
  heading: React.ReactNode = key,
) {
  return tableColumn(key, heading).formatter(BooleanFormatter);
}

export function publishedColumn() {
  return booleanColumn("published", "active").sortable();
}
