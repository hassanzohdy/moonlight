import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { trans } from "@mongez/localization";
import { IconTrash } from "@tabler/icons";
import { parseError } from "../../../../utils/parse-error";
import { toastLoading } from "../../../Toast";
import { useBulkRows } from "../../hooks/useBulkRows";
import { useSuperTable } from "../../hooks/useSuperTable";
import { BulkSelectionRow, SuperTable } from "../../SuperTable";
import { Button } from "../style";

async function deleteMultipleRows(
  superTable: SuperTable,
  bulkRows: BulkSelectionRow[]
) {
  const service: any = superTable.service;
  if (service) {
    const loader = toastLoading(trans("deleting"), trans("deletingInProgress"));
    try {
      if (service.bulkDelete) {
        await service.bulkDelete(bulkRows.map(({ row }) => row.id));
      } else {
        // promise all to delete all rows
        await Promise.all(bulkRows.map(({ row }) => service.delete(row.id)));
      }

      // remove deleted rows from table
      superTable.data = superTable.data.filter(
        (row) => !bulkRows.find(({ row: r }) => r.id === row.id)
      );

      superTable.setData([...superTable.data]);

      superTable.decreasePaginationInfoRow(bulkRows.length);

      superTable.removeBulkRows(bulkRows);

      loader.success(trans("success"), trans("deleteSuccess"));
    } catch (error) {
      loader.error(trans("deleteError"), parseError(error));
    }
  }
}

export function BulkDelete() {
  const selectedBulkRows = useBulkRows();

  const superTable = useSuperTable();

  const openDeleteModal = () =>
    openConfirmModal({
      title: (
        <Text fw="bold" color="red.7">
          {trans("bulkDeleteHeading")}
        </Text>
      ),
      centered: true,
      trapFocus: false,
      exitTransitionDuration: 500,
      children: (
        <Text size="sm">
          {trans("confirmBulkRows", {
            count: (
              <Text color="red" fw="bold" component="span">
                {selectedBulkRows.length}
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
        deleteMultipleRows(superTable, selectedBulkRows);
      },
    });

  return (
    <Button
      color="red"
      onClick={openDeleteModal}
      disabled={selectedBulkRows.length === 0}
      leftIcon={<IconTrash size={20} />}
    >
      {trans("deleteBulk", { count: selectedBulkRows.length })}
    </Button>
  );
}
/** Adding permission will tell Super Table to validate that permission before rendering the component */
BulkDelete.permission = "delete";
