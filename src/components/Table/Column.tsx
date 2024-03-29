import { trans } from "@mongez/localization";
import { get, merge } from "@mongez/reinforcements";
import React from "react";
import { SuperTable } from "./SuperTable";
import {
  ColumnSortBy,
  EditColumnCallback,
  TableColumn,
  TableColumnDisplay,
  TableColumnFormatter,
  TablePlainColumn,
} from "./TableProps";

export class Column {
  /**
   * Column data
   */
  public data: TablePlainColumn;

  /**
   * On edit callback
   */
  public onEditCallback?: EditColumnCallback;

  /**
   * Sort by options
   */
  public sortByOptions: Partial<ColumnSortBy> = {
    enabled: false,
    name: "",
    direction: "desc",
  };

  /**
   * Constructor
   */
  public constructor(key: string, heading: React.ReactNode) {
    this.data = {
      key,
      heading,
      display: "default",
    };
  }

  /**
   * Mark as sortable
   */
  public sortable(name = this.data.key) {
    this.sortByOptions = {
      enabled: true,
      name,
      direction: "desc",
    };

    return this;
  }

  /**
   * Get sort by options
   */
  public getSortByOptions() {
    return this.sortByOptions as ColumnSortBy;
  }

  /**
   * Merge the given column data with current data
   */
  public merge(column: Partial<TableColumn>) {
    this.data = merge(this.data, column);
    return this;
  }

  /**
   * Set formatter
   */
  public formatter(formatter: TableColumnFormatter) {
    this.data.formatter = formatter;
    return this;
  }

  /**
   * Mark as centered
   */
  public centered() {
    this.data.align = "center";
    return this;
  }

  /**
   * Align the column
   */
  public align(align: React.CSSProperties["textAlign"]) {
    this.data.align = align;
    return this;
  }

  /**
   * Set width
   */
  public width(width: number) {
    this.data.width = width;
    return this;
  }

  /**
   * Set sortable
   */
  public display(display: TableColumnDisplay) {
    this.data.display = display;
    return this;
  }

  /**
   * Set column settings
   */
  public settings(settings: any) {
    this.data.settings = settings;
    return this;
  }

  /**
   * Set column class name
   */
  public className(className: string) {
    this.data.className = className;
    return this;
  }

  /**
   * Set column style
   */
  public style(style: React.CSSProperties) {
    this.data.style = style;
    return this;
  }

  /**
   * Set column heading style
   */
  public headingStyle(style: React.CSSProperties) {
    this.data.headingStyle = style;
    return this;
  }

  /**
   * Set heading component
   */
  public headingComponent(headingComponent: React.FC) {
    this.data.headingComponent = headingComponent;
    return this;
  }

  /**
   * Prepare column
   */
  public prepare(prepare: TablePlainColumn["prepare"]) {
    this.data.prepare = prepare;
    return this;
  }

  /**
   * Validate column
   */
  public validate(validate: TablePlainColumn["validate"]) {
    this.data.validate = validate;
    return this;
  }

  /**
   * Set column default value
   */
  public defaultValue(value: any) {
    this.data.defaultValue = value;
    return this;
  }

  /**
   * Get column data
   */
  public getData() {
    return this.data;
  }

  /**
   * Get display mode
   */
  public getDisplayMode() {
    return this.data.display as TableColumnDisplay;
  }

  /**
   * Get column key
   */
  public get key() {
    return this.data.key;
  }

  /**
   * Set column heading
   */
  public setHeading(heading: React.ReactNode) {
    this.data.heading = heading;
    return this;
  }

  /**
   * Get column heading
   */
  public get heading() {
    return this.data.heading;
  }

  /**
   * Get formatter
   */
  public getFormatter() {
    return this.data.formatter as TableColumnFormatter;
  }

  /**
   * Render cell contents
   */
  public render({ row, rowIndex, columnIndex, superTable }) {
    const column = this.data;

    const value = get(row, column.key, column.defaultValue);

    const Formatter = this.getFormatter();

    const Wrapper: React.ComponentType<any> = React.Fragment;
    const wrapperProps = {};

    const children = Formatter ? (
      <Formatter
        {...{
          row,
          rowIndex,
          column: this,
          key: this.key,
          columnIndex,
          value,
          superTable,
          defaultValue: column.defaultValue,
          settings: column.settings || {},
        }}
      />
    ) : (
      value
    );

    return <Wrapper {...wrapperProps}>{children}</Wrapper>;
  }

  /**
   * Get cell class name
   */
  public getCellClassName() {
    return this.data.className;
  }

  /**
   * Get cell styles
   */
  public getCellStyles() {
    return {
      ...this.getCommonStyles(),
      ...this.data.style,
    };
  }

  /**
   * Get heading styles
   */
  public getHeadingStyles() {
    return {
      ...this.getCommonStyles(),
      ...this.data.headingStyle,
    };
  }

  /**
   * Get heading content
   */
  public getHeadingContent() {
    return typeof this.data.heading === "string"
      ? trans(this.data.heading)
      : this.data.heading;
  }

  /**
   * Get common styles between heading and cell
   */
  public getCommonStyles() {
    const style: React.CSSProperties = {};

    const column = this.data;

    if (column.width) {
      style.minWidth = column.width;
    }

    if (column.align) {
      let textAlign: React.CSSProperties["textAlign"] = column.align;
      if (column.align === "left") {
        textAlign = "start";
      } else if (column.align === "right") {
        textAlign = "end";
      }

      style.textAlign = textAlign;
    }

    return style;
  }

  /**
   * validate current column
   */
  public validateColumn(superTable: SuperTable) {
    return this.data.validate?.(this, superTable) || true;
  }
}
