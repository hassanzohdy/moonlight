import { RadioInputBuilder } from "../components";
import { RadioInput } from "./../../components/Form";

export function radioInput(name: string) {
  return new RadioInputBuilder(name).component(RadioInput);
}
