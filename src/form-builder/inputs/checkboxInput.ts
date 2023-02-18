import { CheckboxInput } from "../../components";
import { InputBuilder } from "../components";

export function checkboxInput(name: string) {
  return new InputBuilder(name).component(CheckboxInput).type("checkbox");
}
