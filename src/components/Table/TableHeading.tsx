import Column from "./Column";
import { useSuperTable } from "./hooks/useSuperTable";
import { useTableChange } from "./hooks/useTableChange";
import { SortByColumn } from "./SuperTable/SortByColumn";

export function TableHeading() {
  useTableChange("sortByOptions");
  useTableChange("displayedColumns");

  const superTable = useSuperTable();
  const displayedColumns = superTable.getDisplayedColumns();

  const headings = () => {
    return displayedColumns.map(column => {
      const heading = column.headingComponent ? (
        <column.headingComponent />
      ) : (
        column.heading
      );

      const columnHandler = column.column as Column;
      return (
        <th style={column.headingStyle} key={column.key}>
          <SortByColumn column={columnHandler}>{heading}</SortByColumn>
        </th>
      );
    });
  };

  return (
    <thead>
      <tr>{headings()}</tr>
    </thead>
  );
}
