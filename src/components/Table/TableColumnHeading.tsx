import { trans } from "@mongez/localization";
import Column from "./Column";
import { useDisplayedColumn } from "./hooks";
import { SortByColumn } from "./SuperTable/SortByColumn";

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
