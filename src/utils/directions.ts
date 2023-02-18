import { current } from "@mongez/react";

export type Direction = "ltr" | "rtl";

export function left(
  direction: Direction = current("direction"),
): "left" | "right" {
  switch (direction) {
    case "ltr":
      return "left";
    case "rtl":
      return "right";
    default:
      return "left";
  }
}

export function right(
  direction: Direction = current("direction"),
): "right" | "left" {
  switch (direction) {
    case "ltr":
      return "right";
    case "rtl":
      return "left";
    default:
      return "right";
  }
}

export const directionIs = (direction: "ltr" | "rtl") =>
  current("direction") === direction;
