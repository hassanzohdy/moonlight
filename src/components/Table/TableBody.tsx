import styled from "@emotion/styled";
import { trans } from "@mongez/localization";
import React, { useMemo } from "react";
import TableCell from "./TableCell";
import { useSuperTable } from "./hooks/useSuperTable";
import { useTableChange } from "./hooks/useTableChange";

export const EmptyColumn = styled.td`
  label: EmptyColumn;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[5]};
  font-weight: bold;
`;

function _TableBody() {
  useTableChange("data");
  useTableChange("loading");

  const superTable = useSuperTable();

  const tableRows = useMemo(() => {
    const displayedColumns = superTable.getDisplayedColumns();
    if (superTable.data.length === 0) {
      if (superTable.isLoading) {
        return (
          <tr>
            <EmptyColumn colSpan={displayedColumns.length}>
              {trans("moonlight.loading")}
            </EmptyColumn>
          </tr>
        );
      }

      return (
        <tr>
          <EmptyColumn colSpan={displayedColumns.length}>
            {trans("moonlight.noData")}
          </EmptyColumn>
        </tr>
      );
    }

    return superTable.data.map((row, rowIndex) => {
      // listen to mouse over and mouse out events
      return (
        <tr
          key={row.uniqueId}
          onMouseOver={() => superTable.hovering({ row, rowIndex })}
          onMouseOut={() => {
            superTable.hovering(null);
          }}>
          {superTable.columns.map((column, columnIndex) => {
            return (
              <TableCell
                row={row}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                key={columnIndex}
                column={column}
              />
            );
          })}
        </tr>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [superTable, superTable.isLoading, superTable.data]);

  return <tbody>{tableRows}</tbody>;
}

export const TableBody = React.memo(_TableBody);
