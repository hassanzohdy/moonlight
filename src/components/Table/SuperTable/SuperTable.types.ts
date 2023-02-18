export type PaginationInfo = {
  results: number;
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type TableEvent =
  | "loading"
  | "data"
  | "paginationInfo"
  | "displayedColumns"
  | "limitChange"
  | "limitOptionsChange"
  | "sortByOptions"
  | "sort"
  | "filter"
  | "pageChange"
  | "bulkSelection";

export type BulkSelectionRow = {
  row: any;
  rowIndex: number;
  checked: boolean;
  setChecked: (newState: boolean) => void;
};

export type RegisteredBulkSelectionRow = BulkSelectionRow & {
  unregister: () => void;
  updateState: (newState: boolean) => void;
};

export type LoadMode = "full" | "partial";

export enum SuperTableEvents {
  PAGE_CHANGE = "pageChange",
}
