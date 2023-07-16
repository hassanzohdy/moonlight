import { useEvent, useForceUpdate } from "@mongez/react-hooks";
import { useRef } from "react";
import type { Column } from "../Column";
import { useSuperTable } from "./useSuperTable";

export function useDisplayedColumn(column: Column) {
  const superTable = useSuperTable();

  const displayedColumns = superTable.getDisplayedColumns();
  const reRender = useForceUpdate();
  const columnRefState = useRef<boolean>(displayedColumns.includes(column));

  useEvent(() =>
    superTable.on("displayedColumns", (columns: Column[]) => {
      const isDisplayed = columns.includes(column);

      if (isDisplayed !== columnRefState.current) {
        columnRefState.current = isDisplayed;
        reRender();
      }
    }),
  );

  return columnRefState.current;
}
