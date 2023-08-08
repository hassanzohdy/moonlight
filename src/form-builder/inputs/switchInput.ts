import { SwitchInput } from "../../components";
import { SwitchInputBuilder } from "../components";

export function switchInput(name: string) {
  return new SwitchInputBuilder(name)
    .component(SwitchInput)
    .type("checkbox")
    .updateComponentProps({
      collectUnchecked: true,
      uncheckedValue: false,
    });
}
