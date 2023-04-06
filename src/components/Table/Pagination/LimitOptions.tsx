import { trans } from "@mongez/localization";
import { SelectInput } from "../../Form";
import { Tooltip } from "../../Tooltip";
import { useLimitOptions } from "../hooks/useLimitOptions";
import { useSuperTable } from "../hooks/useSuperTable";

export default function LimitOptions() {
  const limitOptions = useLimitOptions();
  const superTable = useSuperTable();

  if (limitOptions === false) return null;

  const text = trans("moonlight.limitOptions");

  return (
    <Tooltip label={text}>
      <SelectInput
        size="sm"
        name="limit"
        placeholder={text}
        data={limitOptions}
        clearable={false}
        value={String(superTable.paginationInfo.limit)}
        onChange={value => superTable.updateLimit(Number(value))}
      />
    </Tooltip>
  );
}
