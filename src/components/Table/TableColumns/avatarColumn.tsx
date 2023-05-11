import React from "react";
import { AvatarFormatter } from "../Formatters";
import { tableColumn } from "./tableColumn";

export function avatarColumn(
  heading: React.ReactNode,
  imageUrlKey: string,
  name = "name",
) {
  return tableColumn(imageUrlKey, heading).formatter(AvatarFormatter).settings({
    name,
  });
}
