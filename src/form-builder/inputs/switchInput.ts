import { SwitchInput } from "../../components";
import { SwitchInputBuilder } from "../components";

export function switchInput(name: string) {
  return new SwitchInputBuilder(name)
    .component(SwitchInput)
    .type("switch")
    .updateComponentProps({
      collectUnchecked: true,
      uncheckedValue: false,
    });
}
