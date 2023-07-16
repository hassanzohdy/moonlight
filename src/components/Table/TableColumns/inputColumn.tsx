import { trans } from "@mongez/localization";
import { GenericObject } from "@mongez/reinforcements";
import { ComponentType } from "react";
import { getMoonlightConfig } from "../../../config";
import { parseError } from "../../../utils";
import { SwitchInput, TextInput } from "../../Form";
import { toastLoading } from "../../toasters";
import { BooleanFormatter } from "../Formatters";
import type { FormatterProps } from "../TableProps";
import { tableColumn } from "./tableColumn";

export type ColumnInputOptions = {
  heading?: React.ReactNode;
  placeholder?: string;
  inputProps?: GenericObject;
  defaultValueProp?: string;
  inputName?: string;
  notPermittedFormatter?: React.ComponentType<FormatterProps>;
};

export type InputComponentChangeData = {
  value: any;
} & FormatterProps &
  ColumnInputOptions;

export type ColumnInputOnChange = (data: InputComponentChangeData) => void;

export function inputColumn(
  name: string,
  InputComponent: ComponentType<any>,
  onChange: ColumnInputOnChange,
  {
    heading = trans(name),
    placeholder,
    defaultValueProp = "defaultValue",
    inputProps = {},
    inputName = name,
    notPermittedFormatter,
  }: ColumnInputOptions,
) {
  return tableColumn(name, heading).formatter(
    ({
      superTable,
      row,
      rowIndex,
      value,
      ...others
    }: InputComponentChangeData) => {
      inputProps[defaultValueProp] = value;

      if (superTable.forbids("update", row, rowIndex)) {
        if (!notPermittedFormatter) return null;

        const Component = notPermittedFormatter;

        return (
          <Component
            value={value}
            row={row}
            superTable={superTable}
            rowIndex={rowIndex}
            {...others}
          />
        );
      }

      return (
        <InputComponent
          placeholder={placeholder}
          {...inputProps}
          onChange={value => {
            onChange({
              ...others,
              value,
              superTable,
              row,
              rowIndex,
              inputName,
            });
          }}
        />
      );
    },
  );
}

export function createColumnInput(
  InputComponent: ComponentType<any>,
  baseOptions: ColumnInputOptions = {},
) {
  return function (
    name: string,
    onChange: ColumnInputOnChange,
    options: ColumnInputOptions = {},
  ) {
    return inputColumn(name, InputComponent, onChange, {
      ...baseOptions,
      ...options,
    });
  };
}

export const textInputColumn = createColumnInput(TextInput);
export const switchInputColumn = createColumnInput(SwitchInput, {
  defaultValueProp: "defaultChecked",
});

export function activeColumnInput() {
  return switchInputColumn(
    getMoonlightConfig("publishedColumn.name"),
    ({ value, inputName, row, superTable }) => {
      if (!superTable.service) return;

      const columnName = inputName as string;

      if (!row.__patchLoader) {
        row.__patchLoader = {};
      }

      if (row.__patchLoader[columnName]) {
        row.__patchLoader[columnName].close();
      }

      row.__patchLoader[columnName] = toastLoading(trans("moonlight.updating"));

      superTable.service
        .patch(row.id, {
          [columnName]: value,
        })
        .then(() => {
          row.__patchLoader[columnName].success(
            trans("moonlight.updatedSuccessfully"),
          );
        })
        .catch(error => {
          row.__patchLoader[columnName].error(parseError(error));
        })
        .finally(() => {
          setTimeout(() => {
            if (row.__patchLoader[columnName]) {
              row.__patchLoader[columnName].close();
            }
          }, 400);
        });
    },
    {
      heading: getMoonlightConfig("publishedColumn.label"),
      notPermittedFormatter: BooleanFormatter,
    },
  );
}
