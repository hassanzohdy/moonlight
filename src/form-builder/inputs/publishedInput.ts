import { switchInput } from "./switchInput";

export function publishedInput() {
  return switchInput("published").label("active").defaultChecked();
}
