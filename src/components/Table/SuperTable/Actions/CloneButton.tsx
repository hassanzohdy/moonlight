import { ActionIcon, Tooltip } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useOnce } from "@mongez/react-hooks";
import { except, get } from "@mongez/reinforcements";
import { IconCopy } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import React, { useMemo, useState } from "react";
import { getMoonlightConfig } from "../../../../config";
import { moonlightTranslations } from "../../../../locales";
import { catchError } from "../../../../utils";
import { FormatterProps } from "../../TableProps";
import { useRowHoverAction } from "../../hooks/useRowHoverAction";
import { useSuperTable } from "../../hooks/useSuperTable";

// TODO: Fix it when fetching record
function _CloneButton({ row }: FormatterProps) {
  const superTable = useSuperTable();

  const fetchRecord = superTable.fetchRecord;
  const [tableRow, setTableRow] = useState(fetchRecord ? undefined : row);
  const [open, setOpen] = useState(false);
  const Form = superTable.baseForm;
  const [isLoading, setIsLoading] = useState(false);

  const record = useMemo(() => except(tableRow, ["id"]), [tableRow]);

  const openForm = () => {
    if (superTable.fetchRecord) {
      setTableRow(undefined);
      setIsLoading(true);

      superTable.service
        ?.get(row.id)
        .then(response => {
          const dataKey = getMoonlightConfig(
            "reactiveForm.singleRecordKey",
            "record",
          );

          const data = get(response.data, dataKey);

          setTableRow(data);
          setIsLoading(false);
        })
        .catch(error => {
          catchError(error);
          setIsLoading(false);
        });
    }

    setOpen(true);
  };

  useRowHoverAction({
    id: row.id,
    keys: ["mod", "shift", "c"],
    in: openForm,
  });

  useOnce(() => {
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "shift", "c"],
      description: trans("moonlight.cloneShortcut"),
      once: true,
    });
  });

  if (!Form) return null;

  const updateRowData = (response: AxiosResponse) => {
    const record = get(
      response.data,
      superTable.getKey("createRecord", "record"),
    );

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
        onClick={openForm}>
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
        loading={isLoading}
        onClose={() => {
          setOpen(false);
        }}
        onSave={updateRowData}
        record={record}
      />
    </>
  );
}

export const CloneButton = React.memo(_CloneButton);
