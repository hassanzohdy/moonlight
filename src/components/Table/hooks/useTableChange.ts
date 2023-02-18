import { useEvent, useForceUpdate } from "@mongez/react-hooks";
import { TableEvent } from "../SuperTable";
import { useSuperTable } from "./useSuperTable";

export function useTableChange(eventType: TableEvent = "loading") {
  const reRender = useForceUpdate();
  const superTable = useSuperTable();

  useEvent(() => superTable.on(eventType, reRender));
}
