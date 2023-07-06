import { ActionIcon, Table } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useCachedRows, useFormRows } from "@mongez/react-hooks";
import { get } from "@mongez/reinforcements";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import React, { useMemo, useRef } from "react";
import { Tooltip } from "../../components/Tooltip";
import { InputBuilder } from "./InputBuilder";

export function formTableColumn(header: React.ReactNode, input: InputBuilder) {
  return {
    header,
    input,
  };
}

export type FormTableColumn = {
  header: React.ReactNode;
  input: InputBuilder;
};

export class FormTable extends InputBuilder {
  /**
   * Columns
   */
  public columns: FormTableColumn[] = [];

  /**
   * Form Record
   */
  protected record: any = {};

  /**
   * Set Columns
   */
  public setColumns(columns: any[]) {
    this.columns = columns;
    return this;
  }

  /**
   * Add Columns
   */
  public addColumns(...columns: any[]) {
    this.columns = [...this.columns, ...columns];
    return this;
  }

  /**
   * Render Table
   */
  protected renderContent() {
    const columns = this.columns.map(column => {
      const input = column.input.clone();
      // const input = column.input;

      input.shouldDisplay("label", false);

      column.input = input;

      return column;
    });

    return (
      <FormTableComponent
        columns={columns}
        record={this.record}
        defaultValueKey={this.data.defaultValueKey || this.name()}
        formTable={this}
      />
    );
  }
}

// eslint-disable-next-line react/prop-types
function FormTableComponent({
  columns,
  record,
  formTable,
  defaultValueKey,
}: {
  columns: any[];
  record: any;
  defaultValueKey: string;
  formTable: FormTable;
}) {
  const [rows, addRow] = useFormRows({
    initial: get(record, defaultValueKey, []),
    addRow: () => ({
      name: "",
      price: "",
    }),
  });

  const rowsRef = useRef<any>({});

  const rowsList = useCachedRows(rows, ({ key, index, remove, data }) => {
    if (!rowsRef.current[key]) {
      rowsRef.current[key] = {
        key,
        columns: formTable.columns.map(({ header, input }) => ({
          header,
          input: input.clone(),
        })),
      };
    }

    const columns = rowsRef.current[key].columns;

    return (
      <tr key={key}>
        {columns.map(({ header, input }: any, columnIndex: number) => {
          if (!input["_indexedRow" + key + index + columnIndex]) {
            input["_indexedRow" + key + index + columnIndex] = true;

            input.setName(
              formTable.name() +
                "." +
                index +
                "." +
                formTable.columns[columnIndex].input.name(),
            );
          }

          return (
            <td key={header as string}>
              {input
                .placeholder(trans(header as string))
                .setRecord(data)
                .render()}
            </td>
          );
        })}
        <td>
          <ActionIcon onClick={remove} color="red">
            <Tooltip withArrow label={trans("delete")} position="top">
              <span>
                <IconTrash size={16} stroke={1.5} />
              </span>
            </Tooltip>
          </ActionIcon>
        </td>
      </tr>
    );
  });

  const thead = useMemo(() => {
    return (
      <thead>
        <tr>
          {columns.map(({ header }) => (
            <th key={header as string}>
              {typeof header === "string" ? trans(header) : header}
            </th>
          ))}
          <th style={{ minWidth: 80 }}>{trans("actions")}</th>
        </tr>
      </thead>
    );
  }, [columns]);

  return (
    <Table striped>
      {thead}
      <tbody>
        {rowsList}
        <tr>
          <td colSpan={columns.length + 1} style={{ textAlign: "end" }}>
            <ActionIcon variant="gradient" onClick={addRow}>
              <Tooltip withArrow label={trans("add")}>
                <span>
                  <IconPlus size={16} stroke={1.5} />
                </span>
              </Tooltip>
            </ActionIcon>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export function formTable(name: string, defaultValueKey?: string) {
  return new FormTable(name).setDefaultValueKey(defaultValueKey);
}
