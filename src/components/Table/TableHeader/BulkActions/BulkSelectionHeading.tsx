import styled from "@emotion/styled";
import { trans } from "@mongez/localization";
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

  // useEvent(() => {
  // allow super table to toggle the check state without triggering the bulk selection
  // this is useful when a bulk action is performed and the bulk selection should be updated
  // });

  useHotKeys({
    keys: ["mod", "shift", "a"],
    callback: () => updateState(!checkedRef.current),
  });

  useOnce(() => {
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "shift", "x"],
      description: trans("moonlight.selectRowShortcut"),
      order: 1,
    });
  });

  useOnce(() => {
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "shift", "a"],
      description: trans("moonlight.selectAllShortcut"),
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
