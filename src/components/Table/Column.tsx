import { merge } from "@mongez/reinforcements";
import React from "react";
import {
  ColumnSortBy,
  EditColumnCallback,
  EditOptions,
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
   * Determine if the column is editable
   */
  public editColumnOptions: Partial<EditOptions> = {
    enabled: false,
  };

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
   * Set column edit options
   */
  public editable(editOptions: EditOptions) {
    editOptions.enabled = true;
    this.editColumnOptions = editOptions;
    return this;
  }

  /**
   * Get edit options
   */
  public getEditColumnOptions() {
    return this.editColumnOptions as EditOptions;
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
}

export default Column;
