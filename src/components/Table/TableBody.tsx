import styled from "@emotion/styled";
import { trans } from "@mongez/localization";
import React from "react";
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
  useTableChange("displayedColumns");
  useTableChange("loading");

  const superTable = useSuperTable();
  const displayedColumns = superTable.getDisplayedColumns();

  const tableRows = () => {
    if (superTable.data.length === 0) {
      if (superTable.isLoading) {
        return (
          <tr>
            <EmptyColumn colSpan={displayedColumns.length}>
              {trans("loading")}
            </EmptyColumn>
          </tr>
        );
      }

      return (
        <tr>
          <EmptyColumn colSpan={displayedColumns.length}>
            {trans("noData")}
          </EmptyColumn>
        </tr>
      );
    }

    return superTable.data.map((row, rowIndex) => {
      return (
        <tr key={row.uniqueId}>
          {displayedColumns.map((column, columnIndex) => {
            return (
              <td
                key={columnIndex}
                className={column.className}
                style={column.style}>
                {column.render && column.render(row, rowIndex)}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return <tbody>{tableRows()}</tbody>;
}

export const TableBody = React.memo(_TableBody);
