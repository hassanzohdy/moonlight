import { TimePickerInput } from "../../components";
import { InputBuilder } from "../components";

export function timeInput(name = "email") {
  return new InputBuilder(name).component(TimePickerInput);
}
