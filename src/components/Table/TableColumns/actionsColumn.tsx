import { Group } from "@mantine/core";
import React from "react";
import { getMoonlightConfig } from "../../../config";
import { DeleteButton } from "../SuperTable/Actions/DeleteButton";
import { EditBUtton } from "../SuperTable/Actions/EditButton";
import { ViewButton } from "../SuperTable/Actions/ViewButton";
import { FormatterProps, TableColumn } from "../TableProps";
import { tableColumn } from "./tableColumn";

export function actionsColumn(
  buttons: React.FC<FormatterProps>[] = getMoonlightConfig("table.actions", [
    ViewButton,
    EditBUtton,
    DeleteButton,
  ]),
  column: Partial<TableColumn> = {},
) {
  return tableColumn("actions", "actions")
    .merge(column)
    .formatter(ActionsFormatter)
    .headingStyle({
      paddingInlineStart: "1.5rem",
    })
    .prepare((column, superTable) => {
      column.data.settings.buttons = buttons.filter((Button: any) => {
        if (Button.permission) {
          return superTable.hasPermission(Button.permission);
        }

        return true;
      });
    })
    .validate(column => {
      return column.settings.buttons.length > 0;
    })
    .settings({
      buttons,
    });
}

function ActionsFormatter({ row, rowIndex, column }: FormatterProps) {
  const { buttons } = column.settings;

  if (!buttons) return null;

  return (
    <Group>
      {buttons.map(
        (Button: React.FC<Partial<FormatterProps>>, buttonIndex: number) => (
          <Button
            key={buttonIndex}
            column={column}
            row={row}
            rowIndex={rowIndex}
          />
        ),
      )}
    </Group>
  );
}
