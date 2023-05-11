import { getMoonlightConfig } from "../../config";
import { switchInput } from "./switchInput";

export function publishedInput() {
  return switchInput(getMoonlightConfig("publishedColumn.name"))
    .label(getMoonlightConfig("publishedColumn.label"))
    .defaultValue(true)
    .setComponentProps({
      uncheckedValue: false,
    })
    .defaultChecked();
}
