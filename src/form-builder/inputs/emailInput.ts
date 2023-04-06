import { EmailInput } from "../../components";
import { InputBuilder } from "../components";

export function emailInput(name = "email") {
  return new InputBuilder(name).component(EmailInput);
}
