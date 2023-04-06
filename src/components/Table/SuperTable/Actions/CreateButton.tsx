import { Button } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useOnce } from "@mongez/react-hooks";
import { get } from "@mongez/reinforcements";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useHotKeys } from "../../../../hooks/use-hot-keys";
import { useSuperTable } from "../../hooks/useSuperTable";

export function createButton(Form: React.ComponentType<any>) {
  function CreateButtonComponent() {
    const superTable = useSuperTable();
    const [open, setOpen] = useState(false);

    const pushRow = (response: AxiosResponse) => {
      const record = get(response.data, superTable.getKey("createRecord"));

      if (record) {
        superTable.unshiftRow(record);
      }
    };

    useHotKeys({
      keys: ["mod", "Q"],
      callback: () => setOpen(true),
    });

    useOnce(() => {
      return superTable.registerKeyboardShortcut({
        keys: ["mod", "Q"],
        description: "Create New Record",
      });
    });

    return (
      <>
        <Button onClick={() => setOpen(true)} variant="light">
          {trans("create")}
        </Button>

        <Form
          record={superTable.getDefaultRecord()}
          open={open}
          onSave={pushRow}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }

  CreateButtonComponent.permission = "create";

  return CreateButtonComponent;
}
