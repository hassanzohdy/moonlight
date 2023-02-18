import { useOnce } from "@mongez/react-hooks";
import { useRef, useState } from "react";
import { CheckboxInput } from "../../../Form";
import { useSuperTable } from "../../hooks/useSuperTable";
import { RegisteredBulkSelectionRow } from "../../SuperTable";
import { FormatterProps } from "../../TableProps";

export function BulkSelectionFormatter({ row, rowIndex }: FormatterProps) {
  const [checked, setChecked] = useState(false);

  const superTable = useSuperTable();

  const bulkSelection = useRef<RegisteredBulkSelectionRow>();

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
        onChange={e => updateCheckedState(e.target.checked)}
      />
    </>
  );
}

BulkSelectionFormatter.displayName = "BulkSelectionFormatter";
