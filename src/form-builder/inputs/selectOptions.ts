import { SelectInputBuilder } from "../components";

export function selectOptions(name: string, options: any[]) {
  return new SelectInputBuilder(name).options(options);
}
