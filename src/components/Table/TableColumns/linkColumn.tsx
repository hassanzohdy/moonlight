import React from "react";
import { LinkFormatter, LinkFormatterProps } from "../Formatters/LinkFormatter";
import { tableColumn } from "./tableColumn";

export function linkColumn(
  heading: React.ReactNode,
  settings: LinkFormatterProps["settings"],
) {
  return tableColumn("", heading).formatter(LinkFormatter).settings(settings);
}
