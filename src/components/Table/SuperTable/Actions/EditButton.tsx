import { ActionIcon, Tooltip } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useOnce } from "@mongez/react-hooks";
import { get } from "@mongez/reinforcements";
import { IconPencil } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { FormatterProps } from "../../TableProps";
import { useRowHoverAction } from "../../hooks/useRowHoverAction";
import { useSuperTable } from "../../hooks/useSuperTable";

export function EditButton({ row, rowIndex }: FormatterProps) {
  const superTable = useSuperTable();
  const [tableRow, setTableRow] = useState(
    superTable.fetchRecord === false ? row : undefined,
  );
  const [rowId, setRowId] = useState(
    superTable.fetchRecord ? row?.id : undefined,
  );

  useEffect(() => {
    if (superTable.fetchRecord) return;
    setTableRow(row);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

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
      description: trans("moonlight.editShortcut"),
      once: true,
    });
  });

  if (superTable.forbids("update", row, rowIndex)) return null;

  if (!Form) return null;

  const updateRowData = (response: AxiosResponse) => {
    const record = get(response.data, superTable.getKey("updateRecord"));

    superTable.updateRow(record, rowIndex);
  };

  const openForm = () => {
    if (superTable.fetchRecord) {
      setTableRow(undefined);
      setRowId(row.id);
    }

    setOpen(true);
  };

  return (
    <>
      <ActionIcon
        variant="light"
        color="green"
        radius={10000}
        onClick={openForm}>
        <Tooltip withArrow label={trans("moonlight.edit")} position="top">
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
        record={tableRow}
        onSave={updateRowData}
        rowIndex={rowIndex}
        recordId={rowId}
      />
    </>
  );
}

EditButton.permission = "update";
