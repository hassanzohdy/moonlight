import { SelectInputBuilder } from "../components";

export function multiSelectInput(name: string) {
  return new SelectInputBuilder(name).multiple();
}
