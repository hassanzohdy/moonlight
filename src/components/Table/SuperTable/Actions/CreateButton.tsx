import { Button } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useBooleanState, useOnce } from "@mongez/react-hooks";
import { get } from "@mongez/reinforcements";
import { AxiosResponse } from "axios";
import { useHotKeys } from "../../../../hooks/use-hot-keys";
import { modButtons } from "../../../../utils";
import { Tooltip } from "../../../Tooltip";
import { SuperTableCreateButtonProps } from "../../TableProps";
import { useSuperTable } from "../../hooks/useSuperTable";

export function CreateButton({ form: Form }: SuperTableCreateButtonProps) {
  const superTable = useSuperTable();
  const [opened, open, close] = useBooleanState();

  const pushRow = (response: AxiosResponse) => {
    const record = get(response.data, superTable.getKey("createRecord"));

    if (record) {
      superTable.unshiftRow(record);
    }
  };

  useHotKeys({
    keys: ["mod", "Q"],
    callback: open,
  });

  useOnce(() => {
    if (!Form) return null;
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "Q"],
      description: trans("moonlight.createNewRecord"),
    });
  });

  if (!Form) return null;

  return (
    <>
      <Tooltip label={modButtons(["q"])}>
        <Button onClick={open} variant="light">
          {trans("moonlight.create")}
        </Button>
      </Tooltip>

      <Form
        record={superTable.getDefaultRecord()}
        open={opened}
        onSave={pushRow}
        onClose={close}
      />
    </>
  );
}

CreateButton.permission = "create";
