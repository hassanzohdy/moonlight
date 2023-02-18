import { trans } from "@mongez/localization";
import { chooseFilter } from "./chooseFilter";

export function activeFilter() {
  return chooseFilter("published", [
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
