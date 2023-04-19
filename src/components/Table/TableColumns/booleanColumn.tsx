import React from "react";
import { getMoonlightConfig } from "src/moonlight/config";
import { BooleanFormatter } from "../Formatters";
import { tableColumn } from "./tableColumn";

export function booleanColumn(key, heading: React.ReactNode = key) {
  return tableColumn(key, heading).formatter(BooleanFormatter);
}

export function publishedColumn() {
  return booleanColumn(
    getMoonlightConfig("publishedColumn.name"),
    getMoonlightConfig("publishedColumn.label"),
  ).sortable();
}
