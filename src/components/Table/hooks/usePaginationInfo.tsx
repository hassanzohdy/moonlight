import { useSuperTable } from "./useSuperTable";
import { useTableChange } from "./useTableChange";

export function usePaginationInfo() {
  useTableChange("paginationInfo");
  const superTable = useSuperTable();

  return superTable.paginationInfo;
}
