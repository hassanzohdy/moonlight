import React from "react";
import { AvatarFormatter } from "../Formatters";
import { tableColumn } from "./tableColumn";

export function avatarColumn(
  heading: React.ReactNode,
  key: string,
  name = "name",
) {
  return tableColumn(key, heading).formatter(AvatarFormatter).settings({
    name,
  });
}
