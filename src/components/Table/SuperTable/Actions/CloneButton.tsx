import { ActionIcon, Tooltip } from "@mantine/core";
import { trans } from "@mongez/localization";
import { except, get } from "@mongez/reinforcements";
import { IconCopy } from "@tabler/icons";
import { AxiosResponse } from "axios";
import React, { useMemo, useState } from "react";
import { moonlightTranslations } from "../../../../locales";
import { useSuperTable } from "../../hooks/useSuperTable";
import { FormatterProps } from "../../TableProps";

function _CloneButton({ row }: FormatterProps) {
  const superTable = useSuperTable();

  const [open, setOpen] = useState(false);
  const Form = superTable.baseForm;

  const record = useMemo(() => except(row, ["id"]), [row]);

  if (!Form) return null;

  const updateRowData = (response: AxiosResponse) => {
    const record = get(response.data, superTable.getKey("createRecord"));

    if (record) {
      superTable.unshiftRow(record);
    }
  };

  return (
    <>
      <ActionIcon
        variant="light"
        radius={10000}
        color="indigo"
        onClick={() => setOpen(true)}>
        <Tooltip
          withArrow
          label={trans(moonlightTranslations.clone)}
          position="top">
          <span>
            <IconCopy size={16} stroke={1.5} />
          </span>
        </Tooltip>
      </ActionIcon>

      <Form
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        record={record}
        onSave={updateRowData}
      />
    </>
  );
}

export const CloneButton = React.memo(_CloneButton);
