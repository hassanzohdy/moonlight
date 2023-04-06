import { useEvent } from "@mongez/react-hooks";
import { pressedHotKeys } from "./../../../utils/pressed-hot-keys";
import { useSuperTable } from "./useSuperTable";

export type RowHoverHookOptions = {
  id: number;
  keys: string[];
  in: (event: KeyboardEvent) => void;
  out?: () => void;
  preventDefault?: boolean;
  ignoreKeys?: string[];
};
export function useRowHoverAction(options: RowHoverHookOptions) {
  const superTable = useSuperTable();

  useEvent(() => {
    const eventCallback = event => {
      if (pressedHotKeys(options.keys, event, options.ignoreKeys)) {
        if (options.preventDefault || options.preventDefault === undefined) {
          event.preventDefault();
        }

        options.in(event);
      }
    };
    return superTable.onRowHovered(options.id, (hoveredRow: boolean) => {
      document.removeEventListener("keydown", eventCallback);
      if (!hoveredRow) {
        options.out?.();
        return;
      }

      document.addEventListener("keydown", eventCallback, {});
    });
  });
}
