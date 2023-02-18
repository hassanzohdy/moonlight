import { trans } from "@mongez/localization";
import { ChooseInput } from "../../../Form";
import { TableFilter } from "../../TableProps";

export function chooseFilter(
  name = "name",
  data: any,
  tooltip = trans(name),
): TableFilter {
  return {
    name: name,
    component: ChooseInput,
    componentProps: {
      tooltip,
      data: [
        {
          label: trans("all"),
          value: "",
        },
        ...data,
      ],
    },
  };
}
