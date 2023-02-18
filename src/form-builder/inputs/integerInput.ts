import { IntegerInput } from "../../components";
import { NumberInputBuilder } from "../components";

export function integerInput(name: string) {
  return new NumberInputBuilder(name).component(IntegerInput).type("integer");
}
