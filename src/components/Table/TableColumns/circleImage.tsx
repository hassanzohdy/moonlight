import React from "react";
import { ImageFormatter } from "../Formatters";
import { tableColumn } from "./tableColumn";

export function circleImage(key: string, heading: React.ReactNode = "image") {
  return tableColumn(key, heading).formatter(ImageFormatter);
}
