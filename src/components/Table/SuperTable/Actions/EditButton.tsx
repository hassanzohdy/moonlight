import { ActionIcon, Tooltip } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useOnce } from "@mongez/react-hooks";
import { get } from "@mongez/reinforcements";
import { IconPencil } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useRowHoverAction } from "../../hooks/useRowHoverAction";
import { useSuperTable } from "../../hooks/useSuperTable";
import { FormatterProps } from "../../TableProps";

export function EditButton({ row, rowIndex }: FormatterProps) {
  const superTable = useSuperTable();

  const [open, setOpen] = useState(false);
  const Form = superTable.baseForm;

  useRowHoverAction({
    id: row.id,
    keys: ["mod", "e"],
    in: () => setOpen(true),
  });

  useOnce(() => {
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "e"],
      description: "Edit Record (When hovering over row)",
      once: true,
    });
  });

  if (superTable.forbids("update", row, rowIndex)) return null;

  if (!Form) return null;

  const updateRowData = (response: AxiosResponse) => {
    const record = get(response.data, superTable.getKey("updateRecord"));

    superTable.updateRow(record, rowIndex);
  };

  return (
    <>
      <ActionIcon
        variant="light"
        color="green"
        radius={10000}
        onClick={() => setOpen(true)}>
        <Tooltip withArrow label={trans("edit")} position="top">
          <span>
            <IconPencil size={16} stroke={1.5} />
          </span>
        </Tooltip>
      </ActionIcon>

      <Form
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        record={row}
        onSave={updateRowData}
        rowIndex={rowIndex}
      />
    </>
  );
}

EditButton.permission = "update";
