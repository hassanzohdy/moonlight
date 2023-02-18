import { get } from "@mongez/reinforcements";
import { tableColumn } from "./tableColumn";

export function dateColumn(key, heading = key, subKey = "format") {
  return tableColumn(key, heading).formatter(({ row }) => {
    return get(row, key + "." + subKey);
  });
}
