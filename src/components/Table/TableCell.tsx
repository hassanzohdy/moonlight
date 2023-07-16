import type { Column } from "./Column";
import { useDisplayedColumn, useSuperTable } from "./hooks";

export type TableCellProps = {
  column: Column;
  row: any;
  rowIndex: number;
  columnIndex: number;
};

export default function TableCell({
  column,
  row,
  rowIndex,
  columnIndex,
}: TableCellProps) {
  const superTable = useSuperTable();
  const outputColumn = useDisplayedColumn(column);

  if (!outputColumn) return null;

  return (
    <td style={column.getCellStyles()} className={column.getCellClassName()}>
      {column.render({
        row,
        rowIndex,
        columnIndex,
        superTable,
      })}
    </td>
  );
}
