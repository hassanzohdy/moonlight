import { ChipInput } from "../../components/Form";
import { InputBuilder } from "../components";

export function chipInput(name: string) {
  return new InputBuilder(name).component(ChipInput).type("checkbox");
}
