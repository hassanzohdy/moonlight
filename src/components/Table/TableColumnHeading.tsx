import { trans } from "@mongez/localization";
import type { Column } from "./Column";
import { SortByColumn } from "./SuperTable/SortByColumn";
import { useDisplayedColumn } from "./hooks";

export type TableColumnHeadingProps = {
  column: Column;
  columnIndex: number;
};

export default function TableColumnHeading({
  column,
  columnIndex,
}: TableColumnHeadingProps) {
  const outputColumn = useDisplayedColumn(column);

  if (!outputColumn) return null;

  const heading = column.data.headingComponent ? (
    <column.data.headingComponent column={column} columnIndex={columnIndex} />
  ) : (
    trans(column.heading as string)
  );

  return (
    <th style={column.getHeadingStyles()} key={column.key}>
      <SortByColumn column={column}>{heading}</SortByColumn>
    </th>
  );
}
