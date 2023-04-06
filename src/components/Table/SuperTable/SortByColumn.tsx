import styled from "@emotion/styled";
import { ActionIcon, Flex } from "@mantine/core";
import { trans } from "@mongez/localization";
import {
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import React from "react";
import { Tooltip } from "../../Tooltip";
import Column from "../Column";
import { useSuperTable } from "../hooks/useSuperTable";

const Wrapper = styled(Flex)`
  label: SortByColumn;
`;

export function SortByColumn({
  column,
  children,
}: {
  column: Column;
  children: React.ReactNode;
}) {
  const superTable = useSuperTable();

  if (!column.sortByOptions.enabled) {
    return <>{children}</>;
  }

  const nextDirection =
    superTable.sortByOptions.direction === "asc" ? "desc" : "asc";

  const sortIcon =
    superTable.sortByOptions.name === column.sortByOptions.name ? (
      nextDirection === "asc" ? (
        <IconSortAscending />
      ) : (
        <IconSortDescending />
      )
    ) : (
      <IconArrowsSort />
    );

  const reorder = () => {
    superTable.sortBy(column.sortByOptions.name as string, nextDirection);
  };

  return (
    <Wrapper>
      {children}
      <Tooltip
        label={trans("sortDirection", {
          direction: trans(nextDirection),
        })}>
        <ActionIcon size="sm" mx={2} onClick={reorder}>
          {sortIcon}
        </ActionIcon>
      </Tooltip>
    </Wrapper>
  );
}
