import { currentDirection } from "./helpers";

export type Direction = "ltr" | "rtl";

export function left(
  direction: Direction = currentDirection()
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
  direction: Direction = currentDirection()
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
  currentDirection() === direction;
