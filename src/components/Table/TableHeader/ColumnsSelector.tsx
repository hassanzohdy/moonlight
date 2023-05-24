import { Button, Menu } from "@mantine/core";
import { trans } from "@mongez/localization";
import { CheckboxInput } from "../../Form";
import { useSuperTable } from "../hooks";
import { useColumnsSelector } from "../hooks/useColumnsSelector";
import { ColumnsSelectorDropdown } from "./style";

export function ColumnsSelector() {
  const superTable = useSuperTable();
  const {
    defaultDisplayedColumns,
    resetDisplayedColumns,
    toggleColumn,
    alwaysDisplayedColumns,
    optionalDisplayedColumns,
    checkedColumnsList,
    canResetDisplayedColumns,
  } = useColumnsSelector();

  if (!superTable.columnsSelections) return null;

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button color="indigo" variant="light">
            {trans("moonlight.displayedColumns")}
          </Button>
        </Menu.Target>
        <ColumnsSelectorDropdown>
          {canResetDisplayedColumns && (
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
              <Menu.Label>
                {trans("moonlight.defaultDisplayedColumns")}
              </Menu.Label>
              {defaultDisplayedColumns.map((column, index) => (
                <Menu.Item closeMenuOnClick={false} key={index}>
                  <CheckboxInput
                    color="green"
                    onChange={toggleColumn as any}
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
              <Menu.Label>{trans("moonlight.otherColumns")}</Menu.Label>
              {optionalDisplayedColumns.map((column, index) => (
                <Menu.Item closeMenuOnClick={false} key={index}>
                  <CheckboxInput
                    color="orange"
                    onChange={toggleColumn as any}
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
              <Menu.Label>
                {trans("moonlight.alwaysDisplayedColumns")}
              </Menu.Label>
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
