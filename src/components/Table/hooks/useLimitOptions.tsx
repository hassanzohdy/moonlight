import { useSuperTable } from "./useSuperTable";
import { useTableChange } from "./useTableChange";

export function useLimitOptions() {
  useTableChange("limitOptionsChange");
  useTableChange("paginationInfo");

  const superTable = useSuperTable();

  return superTable.limitOptions;
}
