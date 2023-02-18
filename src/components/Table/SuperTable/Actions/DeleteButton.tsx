import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { trans } from "@mongez/localization";
import { IconTrash } from "@tabler/icons";
import { useSuperTable } from "../../hooks/useSuperTable";
import { FormatterProps } from "../../TableProps";

export function DeleteButton({ row, rowIndex }: FormatterProps) {
  const superTable = useSuperTable();

  if (superTable.forbids("delete", row, rowIndex)) return null;

  const openDeleteModal = () =>
    openConfirmModal({
      title: (
        <Text fw="bold" color="red.7">
          {trans("singleDeleteHeading")}
        </Text>
      ),
      centered: true,
      trapFocus: false,
      exitTransitionDuration: 500,
      children: <Text size="sm">{trans("confirmDeleteMessage")}</Text>,
      labels: {
        confirm: trans("confirmDelete"),
        cancel: trans("cancelDelete"),
      },
      confirmProps: { color: "red", autoFocus: true },
      onConfirm: () => superTable.deleteRow(row, rowIndex),
    });

  return (
    <>
      <ActionIcon onClick={openDeleteModal} color="red">
        <Tooltip withArrow label={trans("delete")} position="top">
          <span>
            <IconTrash size={16} stroke={1.5} />
          </span>
        </Tooltip>
      </ActionIcon>
    </>
  );
}

DeleteButton.permission = "delete";
