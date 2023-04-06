import { useOnce } from "@mongez/react-hooks";
import { useRef, useState } from "react";
import { CheckboxInput } from "../../../Form";
import { RegisteredBulkSelectionRow } from "../../SuperTable";
import { FormatterProps } from "../../TableProps";
import { useRowHoverAction } from "../../hooks/useRowHoverAction";
import { useSuperTable } from "../../hooks/useSuperTable";

export function BulkSelectionFormatter({ row, rowIndex }: FormatterProps) {
  const [checked, setChecked] = useState(false);

  const superTable = useSuperTable();

  const bulkSelection = useRef<RegisteredBulkSelectionRow>();

  useRowHoverAction({
    id: row.id,
    keys: ["mod", "s"],
    in: () => {
      updateCheckedState(!bulkSelection.current?.checked);
    },
  });

  const updateCheckedState = (checked: boolean) => {
    bulkSelection.current?.setChecked(checked);
  };

  useOnce(() => {
    bulkSelection.current = superTable.registerBulkSelection({
      row,
      rowIndex,
      checked: false,
      setChecked: setChecked,
    });

    return () => {
      bulkSelection.current?.unregister();
    };
  });

  return (
    <>
      <CheckboxInput
        checked={checked}
        key={String(row.id) + String(rowIndex)}
        onChange={updateCheckedState as any}
      />
    </>
  );
}

BulkSelectionFormatter.displayName = "BulkSelectionFormatter";
