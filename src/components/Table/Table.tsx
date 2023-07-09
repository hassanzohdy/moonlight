import { TableProps as BaseTableProps, Box } from "@mantine/core";
import React from "react";
import { router } from "../../utils/resolvers";
import { SuperTableContext } from "./Context/SuperTableContext";
import { Pagination } from "./Pagination";
import { PaginationResults } from "./Pagination/PaginationResults";
import { StyledTable, TableWrapper } from "./Table.styles";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TableHeading } from "./TableHeading";
import { TableLoader } from "./TableLoader";
import { TableProps } from "./TableProps";
import { useTable } from "./hooks/useTable";

function _Table(props: TableProps & BaseTableProps) {
  const superTable = useTable(props);

  if (!superTable.hasPermission("list")) {
    return router.navigateTo(router.notFoundRoute());
  }

  return (
    <SuperTableContext.Provider value={superTable}>
      <Box pos="relative">
        <TableLoader />
        <TableHeader />
        <TableWrapper>
          <StyledTable {...superTable.props}>
            <TableHeading />
            <TableBody />
          </StyledTable>
        </TableWrapper>
        <PaginationResults />
        <Pagination />
      </Box>
    </SuperTableContext.Provider>
  );
}

export const Table: React.FC<TableProps & BaseTableProps> = React.memo(_Table);

Table.displayName = "Table";

export const BasicTable = React.memo(function _BasicTable(props: TableProps) {
  return (
    <Table
      bulkSelection={false}
      displayHeader={false}
      shortcuts={false}
      {...props}
    />
  );
});
