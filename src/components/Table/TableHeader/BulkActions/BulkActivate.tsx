import { trans } from "@mongez/localization";
import { ChooseInput } from "../../../Form";
import { toastLoading } from "../../../toasters";
import { useBulkRows } from "../../hooks/useBulkRows";
import { useSuperTable } from "../../hooks/useSuperTable";
import { Button } from "../style";

export function BulkActivate() {
  useBulkRows();
  const superTable = useSuperTable();

  const selectedBulkRows = superTable.getSelectedBulkRows();

  const toggleActivate = async isActive => {
    const loader = toastLoading(trans("updating"));

    superTable.toggleSelectedBulkRows();

    const requests: Promise<any>[] = [];

    const rowsData: any[] = [];
    for (const row of selectedBulkRows) {
      rowsData.push({
        ...row.row,
        isActive: isActive === "1",
      });

      requests.push(
        superTable.service!.patch(row.row.id, {
          isActive: isActive === "1",
        }),
      );
    }

    await Promise.all(requests);
    superTable.setData([...rowsData]);

    loader.close();
  };

  if (!superTable.service) return null;

  return (
    <>
      <Button
        style={{
          background: "transparent",
        }}
        disabled={selectedBulkRows.length === 0}>
        <ChooseInput
          data={[
            {
              label: trans("active") + ` (${selectedBulkRows.length})`,
              value: "1",
            },
            {
              label: trans("inactive") + ` (${selectedBulkRows.length})`,
              value: "0",
            },
          ]}
          onChange={toggleActivate}
          disabled={selectedBulkRows.length === 0}
        />
      </Button>
    </>
  );
}

/** Adding permission will tell Super Table to validate that permission before rendering the component */
BulkActivate.permission = "update";
