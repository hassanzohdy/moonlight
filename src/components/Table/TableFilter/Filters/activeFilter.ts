import { trans } from "@mongez/localization";
import { getMoonlightConfig } from "../../../../config";
import { chooseFilter } from "./chooseFilter";

export function activeFilter() {
  return chooseFilter(getMoonlightConfig("publishedColumn.name"), [
    {
      label: trans("active"),
      value: "1",
    },
    {
      label: trans("inactive"),
      value: "0",
    },
  ]);
}
