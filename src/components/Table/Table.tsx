import { TableProps as BaseTableProps } from "@mantine/core";
import React from "react";
import { router } from "../../utils/resolvers";
import { SuperTableContext } from "./Context/SuperTableContext";
import { useTable } from "./hooks/useTable";
import { Pagination } from "./Pagination";
import { PaginationResults } from "./Pagination/PaginationResults";
import { StyledTable, TableWrapper } from "./Table.styles";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { BulkDelete } from "./TableHeader/BulkActions/BulkDelete";
import { TableHeading } from "./TableHeading";
import { TableLoader } from "./TableLoader";
import { TableProps } from "./TableProps";

function _Table(props: TableProps & BaseTableProps) {
  const superTable = useTable(props);

  if (!superTable.hasPermission("list")) {
    return router.navigateTo(router.notFoundRoute);
  }

  return (
    <SuperTableContext.Provider value={superTable}>
      <TableWrapper>
        <TableLoader />
        <TableHeader />
        <StyledTable {...superTable.props}>
          <TableHeading />
          <TableBody />
        </StyledTable>
        <PaginationResults />
        <Pagination />
      </TableWrapper>
    </SuperTableContext.Provider>
  );
}

_Table.defaultProps = {
  hovered: true,
  bulkActions: [BulkDelete],
};

export const Table = React.memo(_Table);

Table.displayName = "Table";
