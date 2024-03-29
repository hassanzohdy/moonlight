import { Box } from "@mantine/core";
import React from "react";
import { getMoonlightConfig } from "../../../config";
import { DeleteButton } from "../SuperTable/Actions/DeleteButton";
import { EditButton } from "../SuperTable/Actions/EditButton";
import { ViewButton } from "../SuperTable/Actions/ViewButton";
import { FormatterProps, TableColumn } from "../TableProps";
import { tableColumn } from "./tableColumn";

export function actionsColumn(
  buttons: React.FC<FormatterProps>[] = getMoonlightConfig("table.actions", [
    ViewButton,
    EditButton,
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
      return column.data.settings?.buttons.length > 0;
    })
    .settings({
      buttons,
    });
}

function ActionsFormatter({ row, rowIndex, column }: FormatterProps) {
  const { buttons } = column.data.settings;

  if (!buttons) return null;

  return (
    <>
      {buttons.map(
        (Button: React.FC<Partial<FormatterProps>>, buttonIndex: number) => (
          <Box display="inline-block" mx={5} key={buttonIndex}>
            <Button
              key={buttonIndex}
              column={column}
              row={row}
              rowIndex={rowIndex}
            />
          </Box>
        ),
      )}
    </>
  );
}
