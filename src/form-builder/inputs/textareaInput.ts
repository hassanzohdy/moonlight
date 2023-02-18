import { TextareaInputBuilder } from "../components";

export function textareaInput(name: string) {
  return new TextareaInputBuilder(name);
}
