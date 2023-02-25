import { Button } from "@mantine/core";
import { trans } from "@mongez/localization";
import { get } from "@mongez/reinforcements";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
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
