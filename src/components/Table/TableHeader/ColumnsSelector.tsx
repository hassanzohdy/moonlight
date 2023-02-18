import { Button, Menu } from "@mantine/core";
import { trans } from "@mongez/localization";
import { CheckboxInput } from "../../Form";
import { useSuperTable } from "../hooks/useSuperTable";
import { ColumnsSelectorDropdown } from "./style";
import { useCheckList } from "./useCheckListHook";

export function ColumnsSelector() {
  const superTable = useSuperTable();

  const columns = superTable.columns;

  const defaultDisplayedColumns = columns.filter(
    column => column.getDisplayMode() === "default",
  );

  const optionalDisplayedColumns = columns.filter(
    column => column.getDisplayMode() === "optional",
  );

  const alwaysDisplayedColumns = columns.filter(
    column => column.getDisplayMode() === "always",
  );

  const [checkedColumnsList, toggleChecklistValue, setCheckedList] =
    useCheckList(() =>
      superTable.getDisplayedColumns().map(column => column.key),
    );

  const toggleColumn = (e: any) => {
    const displayedColumnsKeys = [
      ...toggleChecklistValue(e.target.value, e.target.checked),
      ...alwaysDisplayedColumns.map(column => column.key),
    ];

    superTable.setDisplayedColumns(displayedColumnsKeys);
  };

  const resetDisplayedColumns = () => {
    const defaultCheckedColumns = [
      ...defaultDisplayedColumns.map(column => column.key),
      ...alwaysDisplayedColumns.map(column => column.key),
    ];

    superTable.resetDisplayedColumns();

    setCheckedList(defaultCheckedColumns);
  };

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button color="indigo" variant="light">
            {trans("displayedColumns")}
          </Button>
        </Menu.Target>
        <ColumnsSelectorDropdown>
          {superTable.getCached("displayedColumns", [])?.length > 0 && (
            <>
              <Menu.Label>
                <Button
                  fullWidth
                  variant="gradient"
                  onClick={resetDisplayedColumns}>
                  {trans("reset")}
                </Button>
              </Menu.Label>
            </>
          )}
          {defaultDisplayedColumns.length > 0 && (
            <>
              <Menu.Label>{trans("defaultDisplayedColumns")}</Menu.Label>
              {defaultDisplayedColumns.map((column, index) => (
                <Menu.Item closeMenuOnClick={false} key={index}>
                  <CheckboxInput
                    color="green"
                    onChange={toggleColumn}
                    defaultValue={column.key}
                    checked={checkedColumnsList.includes(column.key)}
                    label={
                      typeof column.heading === "string"
                        ? trans(column.heading)
                        : column.heading
                    }
                  />
                </Menu.Item>
              ))}
            </>
          )}
          {optionalDisplayedColumns.length > 0 && (
            <>
              <Menu.Divider />
              <Menu.Label>{trans("otherColumns")}</Menu.Label>
              {optionalDisplayedColumns.map((column, index) => (
                <Menu.Item closeMenuOnClick={false} key={index}>
                  <CheckboxInput
                    color="orange"
                    onChange={toggleColumn}
                    defaultValue={column.key}
                    checked={checkedColumnsList.includes(column.key)}
                    label={
                      typeof column.heading === "string"
                        ? trans(column.heading)
                        : column.heading
                    }
                  />
                </Menu.Item>
              ))}
            </>
          )}

          {alwaysDisplayedColumns.length > 0 && (
            <>
              <Menu.Divider />
              <Menu.Label>{trans("alwaysDisplayedColumns")}</Menu.Label>
              {alwaysDisplayedColumns.map((column, index) => (
                <Menu.Item closeMenuOnClick={false} key={index}>
                  <CheckboxInput
                    defaultChecked
                    disabled
                    label={
                      typeof column.heading === "string"
                        ? trans(column.heading)
                        : column.heading
                    }
                  />
                </Menu.Item>
              ))}
            </>
          )}
        </ColumnsSelectorDropdown>
      </Menu>
    </>
  );
}
