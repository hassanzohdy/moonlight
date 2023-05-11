import { Button } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useBooleanState, useOnce } from "@mongez/react-hooks";
import { get } from "@mongez/reinforcements";
import { AxiosResponse } from "axios";
import React from "react";
import { useHotKeys } from "../../../../hooks/use-hot-keys";
import { modButtons } from "../../../../utils";
import { Tooltip } from "../../../Tooltip";
import { useSuperTable } from "../../hooks/useSuperTable";

export function createButton(Form: React.ComponentType<any>) {
  function CreateButtonComponent() {
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
      return superTable.registerKeyboardShortcut({
        keys: ["mod", "Q"],
        description: "Create New Record",
      });
    });

    return (
      <>
        <Tooltip label={modButtons(["q"])}>
          <Button onClick={open} variant="light">
            {trans("create")}
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

  CreateButtonComponent.permission = "create";

  return CreateButtonComponent;
}
