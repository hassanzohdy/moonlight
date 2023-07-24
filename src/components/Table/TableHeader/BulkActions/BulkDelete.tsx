import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { trans } from "@mongez/localization";
import { useOnce } from "@mongez/react-hooks";
import { IconTrash } from "@tabler/icons-react";
import { parseError } from "../../../../utils";
import { toastLoading } from "../../../toasters";
import { BulkSelectionRow, SuperTable } from "../../SuperTable";
import { useBulkRows } from "../../hooks/useBulkRows";
import { useSuperTable } from "../../hooks/useSuperTable";
import { Button } from "../style";
import { Tooltip } from "./../../../../components";
import { useHotKeys } from "./../../../../hooks";
import { modButtons } from "./../../../../utils";

async function deleteMultipleRows(
  superTable: SuperTable,
  bulkRows: BulkSelectionRow[],
) {
  const service: any = superTable.service;
  if (service) {
    const loader = toastLoading(
      trans("moonlight.deletingInProgress"),
      trans("moonlight.deleting"),
    );

    try {
      if (service.bulkDelete) {
        await service.bulkDelete({
          id: bulkRows.map(({ row }) => row.id),
        });

        // superTable.updateDataFromResponse(response);
      } else {
        // promise all to delete all rows
        await Promise.all(bulkRows.map(({ row }) => service.delete(row.id)));
      }

      // remove deleted rows from table
      superTable.data = superTable.data.filter(
        row => !bulkRows.find(({ row: r }) => r.id === row.id),
      );

      superTable.setData([...superTable.data]);

      superTable.decreasePaginationInfoRow(bulkRows.length);

      superTable.removeBulkRows(bulkRows);

      loader.success(
        trans("moonlight.deleteSuccess"),
        trans("moonlight.success"),
      );
    } catch (error) {
      loader.error(parseError(error), trans("moonlight.deleteError"));
    }
  }
}

export function BulkDelete() {
  useBulkRows();

  const superTable = useSuperTable();

  const selectedBulkRows = superTable.getSelectedBulkRows();

  const openDeleteModal = () =>
    openConfirmModal({
      title: (
        <Text fw="bold" color="red.7">
          {trans("bulkDeleteHeading")}
        </Text>
      ),
      centered: true,
      trapFocus: false,
      closeOnConfirm: true,
      closeOnCancel: true,
      closeOnEscape: true,
      transitionProps: {
        exitDuration: 400,
      },
      children: (
        <Text size="sm">
          {trans("confirmBulkRows", {
            count: (
              <Text color="red" fw="bold" component="span">
                {superTable.getSelectedBulkRows().length}
              </Text>
            ),
          })}
        </Text>
      ),
      labels: {
        confirm: trans("confirmDelete"),
        cancel: trans("cancelDelete"),
      },
      confirmProps: { color: "red", autoFocus: true },
      onConfirm: async () => {
        deleteMultipleRows(superTable, superTable.getSelectedBulkRows());
      },
    });

  useHotKeys({
    keys: ["mod", "shift", "d"],
    callback: () => {
      superTable.toggleAllBulkSelection(true);
      setTimeout(() => {
        openDeleteModal();
      }, 0);
    },
  });

  useOnce(() => {
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "shift", "D"],
      description: trans("moonlight.deleteAllShortcut"),
    });
  });

  return (
    <Tooltip
      label={trans("moonlight.delete") + " " + modButtons(["shift", "d"])}>
      <Button
        color="red"
        onClick={openDeleteModal}
        disabled={selectedBulkRows.length === 0}
        leftIcon={<IconTrash size={20} />}>
        {/* {trans("deleteBulk", { count: selectedBulkRows.length })} */}
        {selectedBulkRows.length}
      </Button>
    </Tooltip>
  );
}
/** Adding permission will tell Super Table to validate that permission before rendering the component */
BulkDelete.permission = "delete";
