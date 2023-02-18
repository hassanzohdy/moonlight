import { InputBuilder } from "../components";

export function textInput(name: string) {
  return new InputBuilder(name);
}
