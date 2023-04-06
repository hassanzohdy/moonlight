import { NumberInputBuilder } from "../components";
import { NumberInput } from "./../../components/Form";

export function numberInput(name: string) {
  return new NumberInputBuilder(name).component(NumberInput);
}
