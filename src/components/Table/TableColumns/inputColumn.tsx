import { trans } from "@mongez/localization";
import { GenericObject, debounce } from "@mongez/reinforcements";
import React, { ComponentType, useState } from "react";
import { getMoonlightConfig } from "../../../config";
import { parseError } from "../../../utils";
import {
  ChooseInput,
  EmailInput,
  NumberInput,
  SwitchInput,
  TextInput,
} from "../../Form";
import { toastLoading } from "../../toasters";
import { Column } from "../Column";
import { NumberColumnFormatter } from "../Formatters";
import type { FormatterProps, TableColumnFormatter } from "../TableProps";

export function defaultOnChangeInputColumn({
  value,
  superTable,
  row,
  column,
}: InputComponentChangeData) {
  if (!superTable.service) return;

  const columnName: string = column.componentProps.inputName || column.key;

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
}

export type InputColumnValidateCallback = (
  valudateOptions: Pick<
    InputColumnFormatterProps,
    | "column"
    | "columnIndex"
    | "key"
    | "value"
    | "superTable"
    | "rowIndex"
    | "row"
  >,
) => boolean | Promise<boolean>;

export class InputColumn extends Column {
  /**
   * Component props
   */
  public componentProps: GenericObject = {};

  /**
   * Not permitted formatter
   */
  protected _notPermittedFormatter?: React.ComponentType<InputColumnFormatterProps>;

  /**
   * This on change callback will be called when the input value changes if the _onChange is not provided
   */
  protected _defaultOnChange: ColumnInputOnChange = defaultOnChangeInputColumn;

  /**
   * Validate callback
   */
  protected _validate: InputColumnValidateCallback = () => true;

  /**
   * Component
   */
  protected _component!: ComponentType<any>;

  /**
   * On input value change
   */
  protected _onChange?: ColumnInputOnChange;

  /**
   * Deboucne delay
   */
  protected _debounceDelay = 300;

  /**
   * Default value prop
   */
  protected _valueProp = "value";

  /**
   * Permission key
   */
  protected _permissionKey = "update";

  /**
   * Input placeholder
   */
  public placeholder(placeholder: string) {
    this.componentProps.placeholder = placeholder;

    return this;
  }

  /**
   * Input name
   *
   * @default to the column name
   */
  public inputName(name: string) {
    this.componentProps.inputName = name;

    return this;
  }

  /**
   * Input props
   */
  public inputProps(props: GenericObject) {
    this.componentProps = { ...this.componentProps, ...props };

    return this;
  }

  /**
   * Not permitted formatter
   */
  public notPermittedFormatter(
    formatter: React.ComponentType<InputColumnFormatterProps>,
  ) {
    this._notPermittedFormatter = formatter;

    return this;
  }

  /**
   * Default value prop
   */
  public valueProp(prop: string) {
    this._valueProp = prop;

    return this;
  }

  /**
   * Permission key
   */
  public perission(key: string) {
    this._permissionKey = key;

    return this;
  }

  /**
   * On input value change
   */
  public onChange(onChange: ColumnInputOnChange) {
    this._onChange = onChange;

    return this;
  }

  /**
   * Set Component
   */
  public component(Component: ComponentType<any>) {
    this._component = Component;

    return this;
  }

  /**
   * Input width
   */
  public width(width: string | number) {
    return this.style({ width });
  }

  /**
   * Add input style
   */
  public style(style: React.CSSProperties): this;
  public style(key: string, value: string | number): this;
  public style(key: any, value?: any) {
    if (typeof key === "object") {
      this.componentProps.style = { ...this.componentProps.style, ...key };
    } else {
      this.componentProps.style = {
        ...this.componentProps.style,
        [key]: value,
      };
    }

    return this;
  }

  /**
   * Set debounce delay
   */
  public debounce(delay: number) {
    this._debounceDelay = delay;

    return this;
  }

  /**
   * Validate input value
   * This will be called when the input value changes and before calling the onChange method
   * If not returned true, the onChange method will not be called
   */
  public validateInput(validate: InputColumnValidateCallback) {
    this._validate = validate;

    return this;
  }

  /**
   * {@inheritDoc}
   */
  public getFormatter() {
    return InputColumnFormatter as TableColumnFormatter;
  }
}

export type InputColumnFormatterProps = Omit<FormatterProps, "column"> & {
  column: InputColumn;
};

export function InputColumnFormatter({
  row,
  rowIndex,
  column,
  superTable,
  value,
  ...others
}: InputColumnFormatterProps) {
  const inputProps = column.componentProps;
  const [inputValue, setInputValue] = useState(value);

  inputProps[(column as any)._valueProp] = inputValue;

  if (superTable.forbids((column as any)._permissionKey, row, rowIndex)) {
    const notPermittedFormatter = (column as any)._notPermittedFormatter;
    if (!notPermittedFormatter) return null;

    const Component = notPermittedFormatter;

    return (
      <Component
        value={value}
        row={row}
        superTable={superTable}
        rowIndex={rowIndex}
        column={column}
        {...others}
      />
    );
  }

  const InputComponent = (column as any)._component;

  const changeInputValue = async (value: any) => {
    if (
      (await (column as any)._validate({
        column,
        columnIndex: others.columnIndex,
        key: others.key,
        value,
        superTable,
        row,
        rowIndex,
      })) !== true
    )
      return;

    const onChange =
      (column as any)._onChange || (column as any)._defaultOnChange;

    onChange?.({
      ...others,
      value,
      superTable,
      row,
      rowIndex,
      column,
    });

    setInputValue(value);
  };

  return (
    <InputComponent
      {...inputProps}
      onChange={debounce(changeInputValue, (column as any)._debounceDelay)}
    />
  );
}

export class NumberInputColumn extends InputColumn {
  /**
   * Whether to hide controls
   */
  public hideControls(hide = true) {
    return this.inputProps({
      hideControls: hide,
    });
  }
}

export type ColumnInputOptions = {
  heading?: React.ReactNode;
  placeholder?: string;
  inputProps?: GenericObject;
  valueProp?: string;
  inputName?: string;
  notPermittedFormatter?: React.ComponentType<InputColumnFormatterProps>;
};

export type InputComponentChangeData = {
  value: any;
} & InputColumnFormatterProps &
  ColumnInputOptions;

export type ColumnInputOnChange = (data: InputComponentChangeData) => void;

export const inputColumn = (
  name: string,
  heading = name,
  component: ComponentType,
) => new InputColumn(name, heading).component(component);

export function textInputColumn(name: string, heading = name) {
  return new InputColumn(name, heading)
    .component(TextInput)
    .placeholder(heading);
}

export const emailInputColumn = (name: string, heading = name) =>
  inputColumn(name, heading, EmailInput).placeholder(heading);

export function booleanInputColumn(name: string, heading = name) {
  return new InputColumn(name, heading)
    .component(SwitchInput)
    .valueProp("checked")
    .debounce(0);
}

export function activeInputColumn() {
  return booleanInputColumn(
    getMoonlightConfig("publishedColumn.name"),
    getMoonlightConfig("publishedColumn.label"),
  );
}

export function chooseInputColumn(name: string, data: any[], heading = name) {
  return new InputColumn(name, heading)
    .component(ChooseInput)
    .inputProps({ data });
}

export function numberInputColumn(name: string, heading = name) {
  return new NumberInputColumn(name, heading)
    .component(NumberInput)
    .hideControls(true)
    .notPermittedFormatter(NumberColumnFormatter)
    .width(50);
}
