import { useMemo } from "react";
import TableColumnHeading from "./TableColumnHeading";
import { useSuperTable } from "./hooks/useSuperTable";

export function TableHeading() {
  const superTable = useSuperTable();

  const tableHeading = useMemo(() => {
    return superTable.columns.map((column, index) => {
      return (
        <TableColumnHeading key={index} column={column} columnIndex={index} />
      );
    });
  }, [superTable]);

  return (
    <thead>
      <tr>{tableHeading}</tr>
    </thead>
  );
}
