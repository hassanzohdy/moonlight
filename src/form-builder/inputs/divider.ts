import React from "react";
import { DividerBuilder } from "../components";

export function divider(label?: React.ReactNode) {
  const divider = new DividerBuilder();

  if (label) {
    divider.label(label).spacing("lg").labelPosition("center");
  }

  return divider;
}
