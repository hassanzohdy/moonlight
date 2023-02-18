import { SelectInputBuilder } from "../components";

export function selectRequest(name: string) {
  return new SelectInputBuilder(name);
}
