import { HiddenInputBuilder } from "../components";

export function hiddenInput(name: string, value?: any) {
  return new HiddenInputBuilder(name).defaultValue(value);
}
