import styled from "@emotion/styled";
import { useOnce } from "@mongez/react-hooks";
import { useRef, useState } from "react";
import { useHotKeys } from "../../../../hooks/use-hot-keys";
import { CheckboxInput } from "../../../Form";
import { useSuperTable } from "../../hooks/useSuperTable";

const CheckBoxWrapper = styled.div`
  label: CheckBoxWrapper;
  margin-top: 9px;
`;

export function BulkSelectionHeading() {
  const superTable = useSuperTable();
  const checkedRef = useRef(false);
  const [checked, setChecked] = useState(false);

  const updateState = (checked: boolean) => {
    checkedRef.current = checked;
    superTable.toggleAllBulkSelection(checked);
    setChecked(checked);
  };

  useHotKeys({
    keys: ["mod", "shift", "a"],
    callback: () => updateState(!checkedRef.current),
  });

  useOnce(() => {
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "shift", "a"],
      description: "Select/Deselect All Records",
      order: 1,
    });
  });

  return (
    <CheckBoxWrapper>
      <CheckboxInput
        name="bulkSelector"
        checked={checked}
        onChange={updateState as any}
      />
    </CheckBoxWrapper>
  );
}
