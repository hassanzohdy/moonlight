import { useContext } from "react";
import { SuperTableContext } from "../Context/SuperTableContext";
import { SuperTable } from "../SuperTable";

export function useSuperTable() {
  return useContext(SuperTableContext) as SuperTable;
}
