import { trans } from "@mongez/localization";
import { ChooseInput } from "../../../Form";
import { TableFilter } from "../../TableProps";

export function booleanFilter(
  name = "name",
  tooltip = trans(name),
): TableFilter {
  return {
    name: name,
    component: ChooseInput,
    componentProps: {
      tooltip,
      data: [
        {
          label: trans("moonlight.all"),
          value: "",
        },
        {
          label: trans("moonlight.yes"),
          value: "1",
        },
        {
          label: trans("moonlight.no"),
          value: "0",
        },
      ],
    },
  };
}
