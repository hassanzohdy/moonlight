import { trans } from "@mongez/localization";
import { SelectInput } from "../../Form";
import { useLimitOptions } from "../hooks/useLimitOptions";
import { useSuperTable } from "../hooks/useSuperTable";

export default function LimitOptions() {
  const limitOptions = useLimitOptions();
  const superTable = useSuperTable();

  if (limitOptions === false) return null;

  return (
    <SelectInput
      size="sm"
      name="limit"
      placeholder={trans("limit")}
      data={limitOptions}
      clearable={false}
      value={String(superTable.paginationInfo.limit)}
      onChange={(value) => superTable.updateLimit(Number(value))}
    />
  );
}
