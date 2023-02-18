import { ChipsInputBuilder } from "../components";
import { ChipInput } from "./../../components";

export function chipsInput(name: string) {
  return new ChipsInputBuilder(name).type("checkbox").component(ChipInput);
}
