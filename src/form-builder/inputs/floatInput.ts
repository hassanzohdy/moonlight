import { FloatInput } from "../../components";
import { NumberInputBuilder } from "../components";

export function floatInput(name: string) {
  return new NumberInputBuilder(name).component(FloatInput).type("float");
}
