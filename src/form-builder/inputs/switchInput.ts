import { SwitchInput } from "../../components";
import { InputBuilder } from "../components";

export function switchInput(name: string) {
  return new InputBuilder(name)
    .component(SwitchInput)
    .type("switch")
    .updateComponentProps({
      collectUnchecked: true,
      uncheckedValue: false,
    });
}
