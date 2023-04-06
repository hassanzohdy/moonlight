import type { FormControlChangeOptions } from "@mongez/react-form";
import { unique } from "@mongez/reinforcements";
import { useMemo, useState } from "react";
import Column from "../Column";
import { useSuperTable } from "./useSuperTable";

export function useColumnsSelector() {
  const superTable = useSuperTable();

  const {
    defaultDisplayedColumns,
    alwaysDisplayedColumns,
    optionalDisplayedColumns,
  } = useMemo(() => {
    const columns = superTable.columns;

    const defaultDisplayedColumns: Column[] = [];

    const optionalDisplayedColumns: Column[] = [];

    const alwaysDisplayedColumns: Column[] = [];

    columns.forEach(column => {
      const displayMode = column.getDisplayMode();

      if (displayMode === "always") {
        alwaysDisplayedColumns.push(column);
      } else if (displayMode === "optional") {
        optionalDisplayedColumns.push(column);
      } else {
        defaultDisplayedColumns.push(column);
      }
    });

    return {
      defaultDisplayedColumns,
      alwaysDisplayedColumns,
      optionalDisplayedColumns,
    };
  }, [superTable.columns]);

  const [checkedColumnsList, setCheckedColumnsList] = useState<string[]>(
    () =>
      superTable.getCached("displayedColumns") || [
        ...defaultDisplayedColumns.map(column => column.key),
        ...alwaysDisplayedColumns.map(column => column.key),
      ],
  );

  const resetDisplayedColumns = () => {
    const defaultCheckedColumns = [
      ...defaultDisplayedColumns.map(column => column.key),
      ...alwaysDisplayedColumns.map(column => column.key),
    ];

    superTable.resetDisplayedColumns();

    setCheckedColumnsList(defaultCheckedColumns);
  };

  const toggleColumn = (
    checked: boolean,
    { value }: FormControlChangeOptions,
  ) => {
    setCheckedColumnsList(checkedColumnsList => {
      let displayedColumnsKeys: string[] = [];
      if (checked) {
        displayedColumnsKeys = unique([...checkedColumnsList, value]);
      } else {
        displayedColumnsKeys = checkedColumnsList.filter(key => key !== value);
      }

      superTable.setDisplayedColumns(displayedColumnsKeys);
      return displayedColumnsKeys;
    });
  };

  const displayedColumnsList = useMemo(() => {
    return superTable.getDisplayedColumns().map(column => column.key);
  }, [superTable]);

  const canResetDisplayedColumns = useMemo(() => {
    return displayedColumnsList.length !== checkedColumnsList.length;
  }, [checkedColumnsList.length, displayedColumnsList.length]);

  return {
    defaultDisplayedColumns,
    alwaysDisplayedColumns,
    optionalDisplayedColumns,
    resetDisplayedColumns,
    displayedColumnsList,
    checkedColumnsList,
    toggleColumn,
    setCheckedColumnsList,
    canResetDisplayedColumns,
  };
}
