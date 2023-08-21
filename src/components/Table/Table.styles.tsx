import styled from "@emotion/styled";
import { ScrollArea, Table } from "@mantine/core";

export const StyledTable = styled(Table)`
  label: StyledTable;
  margin: 2rem 0 0;
  border: 1px solid
    ${({ theme }) =>
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2]};
`;

export const TableWrapper = styled(ScrollArea)`
  label: TableWrapper;
  max-width: 100%;
  margin: 2rem 0;
  position: relative;
  overflow-x: auto;
`;
