import { Pagination as BasePagination } from "@mantine/core";
import { usePaginationInfo } from "../hooks/usePaginationInfo";
import { useSuperTable } from "../hooks/useSuperTable";

export function Pagination() {
  const paginationInfo = usePaginationInfo();
  const superTable = useSuperTable();

  if (isNaN(paginationInfo.pages)) return null;

  if (!superTable.isPaginationEnabled()) return null;

  return (
    <BasePagination
      value={paginationInfo.page}
      total={paginationInfo.pages}
      position="center"
      withEdges
      onChange={page => {
        superTable.goToPage(page);
      }}
    />
  );
}
