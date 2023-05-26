import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { trans } from "@mongez/localization";
import { useOnce } from "@mongez/react-hooks";
import { IconTrash } from "@tabler/icons-react";
import { FormatterProps } from "../../TableProps";
import { useRowHoverAction } from "../../hooks/useRowHoverAction";
import { useSuperTable } from "../../hooks/useSuperTable";

export function DeleteButton({ row, rowIndex }: FormatterProps) {
  const superTable = useSuperTable();

  const openDeleteModal = () =>
    openConfirmModal({
      title: (
        <Text fw="bold" color="red.7">
          {trans("moonlight.singleDeleteHeading")}
        </Text>
      ),
      centered: true,
      trapFocus: false,
      transitionProps: {
        exitDuration: 400,
      },
      children: (
        <Text size="sm">{trans("moonlight.confirmDeleteMessage")}</Text>
      ),
      labels: {
        confirm: trans("moonlight.confirmDelete"),
        cancel: trans("moonlight.cancelDelete"),
      },
      closeOnConfirm: true,
      closeOnCancel: true,
      closeOnEscape: true,
      closeOnClickOutside: true,
      confirmProps: { color: "red", autoFocus: true },
      onConfirm: () => superTable.deleteRow(row, rowIndex),
    });

  useRowHoverAction({
    id: row.id,
    keys: ["mod", "d"],
    ignoreKeys: ["shift"],
    in: openDeleteModal,
  });

  useOnce(() => {
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "d"],
      description: "Delete Record (When hovering over row)",
      once: true,
    });
  });

  if (superTable.forbids("delete", row, rowIndex)) return null;

  return (
    <>
      <ActionIcon
        radius={10000}
        variant="light"
        onClick={openDeleteModal}
        color="red">
        <Tooltip withArrow label={trans("moonlight.delete")} position="top">
          <span>
            <IconTrash size={16} stroke={1.5} />
          </span>
        </Tooltip>
      </ActionIcon>
    </>
  );
}

DeleteButton.permission = "delete";
