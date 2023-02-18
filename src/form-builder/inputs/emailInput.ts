import { EmailInput } from "../../components";
import { InputBuilder } from "../components";

export function emailInput(name: string) {
  return new InputBuilder(name).component(EmailInput);
}
