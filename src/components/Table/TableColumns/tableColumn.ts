import React from "react";
import { Column } from "../Column";

export function tableColumn(name: string, heading: React.ReactNode = name) {
  return new Column(name, heading);
}
