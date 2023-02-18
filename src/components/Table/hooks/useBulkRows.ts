import { useSuperTable } from "./useSuperTable";
import { useTableChange } from "./useTableChange";

export function useBulkRows() {
  useTableChange("bulkSelection");

  const superTable = useSuperTable();

  return superTable.getSelectedBulkRows();
}
