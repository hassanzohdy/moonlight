import { useTableChange } from "./useTableChange";

export function useBulkRows() {
  useTableChange("bulkSelection");
}
