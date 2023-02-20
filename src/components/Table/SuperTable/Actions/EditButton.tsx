import { ActionIcon, Tooltip } from "@mantine/core";
import { trans } from "@mongez/localization";
import { get } from "@mongez/reinforcements";
import { IconPencil } from "@tabler/icons";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useSuperTable } from "../../hooks/useSuperTable";
import { FormatterProps } from "../../TableProps";
import { getMoonlightConfig } from "./../../../../config";

export function EditBUtton({ row, rowIndex }: FormatterProps) {
  const superTable = useSuperTable();

  const [open, setOpen] = useState(false);
  const Form = superTable.baseForm;

  if (superTable.forbids("update", row, rowIndex)) return null;

  if (!Form) return null;

  const updateRowData = (response: AxiosResponse) => {
    const recordKey = getMoonlightConfig("table.updateRecordKey", "record");
    const record = get(response.data, recordKey, "record");

    superTable.updateRow(record, rowIndex);
  };

  return (
    <>
      <ActionIcon onClick={() => setOpen(true)}>
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

EditBUtton.permission = "update";
