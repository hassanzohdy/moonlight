import { DateInputBuilder } from "../components";

export function dateInput(name: string) {
  return new DateInputBuilder(name);
}
