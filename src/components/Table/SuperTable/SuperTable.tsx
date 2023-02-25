// Change
import events, { EventSubscription } from "@mongez/events";
import { RestfulEndpoint } from "@mongez/http";
import { trans } from "@mongez/localization";
import { FormInterface, getForm } from "@mongez/react-form";
import { debounce, get, merge, Random } from "@mongez/reinforcements";
import Is from "@mongez/supportive-is";
import { AxiosResponse } from "axios";
import serialize from "form-serialize";
import React from "react";
import { createReactForm } from "../../../form-builder/create-reactive-form";
import { moonlightTranslations } from "../../../locales";
import { parseError } from "../../../utils/parse-error";
import { queryString } from "../../../utils/resolvers";
import { scrollTop } from "../../../utils/scroll";
import {
  DatePickerInput,
  FloatInput,
  IntegerInput,
  NumberInput,
  SelectInput,
  SwitchInput,
} from "../../Form";
import { TextInput } from "../../Form/TextInput";
import { toastError, toastLoading } from "../../Toast";
import Column from "../Column";
import { tableColumn } from "../TableColumns/tableColumn";
import { BulkSelectionFormatter } from "../TableHeader/BulkActions/BulkSelectionFormatter";
import { BulkSelectionHeading } from "../TableHeader/BulkActions/BulkSelectionHeading";
import {
  ColumnSortBy,
  SortDirection,
  TableFilter,
  TableHeaderButtons,
  TablePlainColumn,
  TableProps,
} from "../TableProps";
import { getMoonlightConfig } from "./../../../config";
import { EditColumn } from "./EditColumn";
import {
  BulkSelectionRow,
  LoadMode,
  PaginationInfo,
  RegisteredBulkSelectionRow,
  TableEvent,
} from "./SuperTable.types";

const defaultCallback = () => {
  //
};

export class SuperTable {
  /**
   * Table Pagination settings
   */
  public paginationInfo: PaginationInfo = {
    page: 1,
    results: 0,
    limit: 1,
    total: 0,
    pages: 0,
  };

  /**
   * Default record data
   * Used with create form usually
   */
  protected defaultRecord: any = {};

  /**
   * Table data
   */
  public data: any[] = [];

  /**
   * Table title
   */
  public title = "";

  /**
   * Table Columns
   */
  public columns: Column[] = [];

  /**
   * Table name
   */
  public tableName = "";

  /**
   * Table Service
   */
  public service?: RestfulEndpoint;

  /**
   * Default params to be sent with each list request
   */
  public defaultParams?: any;

  /**
   * Determine if table is being loaded
   */
  public isLoading = false;

  /**
   * Is resetting filter
   */
  protected isResettingFilter = false;

  /**
   * Loading mode
   */
  public loadMode: LoadMode = "full";

  /**
   * Table Component props
   */
  public props: Record<string, any> = {};

  /**
   * Table filters
   */
  public filters: TableFilter[] = [];

  /**
   * Filter options
   */
  public filterOptions: TableProps["filterOptions"] = {
    loadOnChange: true,
  };

  /**
   * Table error
   */
  public error: any;

  /**
   * Table header buttons
   */
  public buttons: TableHeaderButtons = {
    actions: [],
    create: [],
  };

  /**
   * Table base form
   */
  public baseForm?: React.FC<any>;

  /**
   * Table filter form id
   */
  public tableFilterFromId = "table-filter";

  /**
   * Request query params
   */
  public queryParams: Record<string, any> = {};

  /**
   * Determine whether to update url query string
   */
  public updateQueryString = true;

  /**
   * Table id
   */
  public tableId = "";

  /**
   * Displayed columns keys
   */
  public displayedColumns: TablePlainColumn[] = [];

  /**
   * Table role
   */
  public role = "";

  /**
   * Permissions list
   */
  public permissions: TableProps["permissions"] = {};

  /**
   * Table cache key
   */
  public cacheKey = `st`;

  /**
   * Bulk Actions list
   */
  public bulkActions: React.ComponentType<any>[] = [];

  /**
   * Determine whether to enable bulk selection
   */
  protected bulkSelection = true;

  /**
   * Cache displayed columns with bulk selection
   */
  protected displayedColumnsWithBulkSelection: TablePlainColumn[] = [];

  /**
   * Registered bulk selection
   */
  protected registeredBulkSelection: BulkSelectionRow[] = [];

  /**
   * Current query string to be cached so we can use it again when resetting form
   */
  protected currentQueryString: Record<string, any> = {};

  /**
   * Sort by options
   */
  public sortByOptions: ColumnSortBy = {
    direction: "desc",
    name: "",
    enabled: false,
  };

  /**
   * Limit options
   */
  public limitOptions: number[] | false =
    getMoonlightConfig("table.limitOptions");

  /**
   * Pagination info cast callback
   */
  protected paginationInfoCast = response => response.data.paginationInfo;

  /**
   * Determine if pagination is enabled
   */
  protected paginationEnabled = true;

  /**
   * Cache handler
   */
  public cacheHandler: any = getMoonlightConfig("cache.handler");

  /**
   * Keys names for records and record
   */
  protected keysList: {
    records: string;
    record: string;
    createRecord: string;
    updateRecord: string;
  } = {
    records: "records",
    record: "record",
    createRecord: "record",
    updateRecord: "record",
  };

  /**
   * Constructor
   */
  public constructor(public lazyTable = false) {
    this.setId(Random.id());
    this.currentQueryString = queryString.all?.() || {};

    this.keysList = merge(this.keysList, getMoonlightConfig("table.keys", {}));

    if (lazyTable) {
      this.isLoading = true;

      const paginationInfoHandler = getMoonlightConfig("table.paginationInfo");

      if (paginationInfoHandler) {
        this.castPaginationInfo(paginationInfoHandler);
      }
    }
  }

  /**
   * Merge keys
   */
  public mergeKeys(keys: any) {
    this.keysList = merge(this.keysList, keys);

    return this;
  }

  /**
   * Get name of the given key
   */
  public getKey(key: string, defaultValue?: any) {
    return this.keysList[key] || defaultValue;
  }

  /**
   * Set default record
   */
  public setDefaultRecord(record: any) {
    this.defaultRecord = record;

    return this;
  }

  /**
   * Get default record
   */
  public getDefaultRecord() {
    return this.defaultRecord;
  }

  /**
   * Set limit options
   */
  public setLimitOptions(options: number[] | false) {
    this.limitOptions = options;

    this.trigger("limitOptionsChange", options);

    return this;
  }

  /**
   * Listen to table page change
   */
  public onPageChange(
    callback: (page: number, paramsList: any) => void = defaultCallback,
  ) {
    return this.on("pageChange", callback);
  }

  /**
   * Listen to table filter change
   */
  public onFilterChange(callback: (filter: any) => void = defaultCallback) {
    return this.on("filter", callback);
  }

  /**
   * Listen to table sort change
   */
  public onSortChange(
    callback: (
      sortingColumn: string,
      sortDirection: SortDirection,
      column: Column,
    ) => void = defaultCallback,
  ) {
    return this.on("sort", callback);
  }

  /**
   * Listen to table size change
   */
  public onPageSizeChange(callback: (size: number) => void = defaultCallback) {
    return this.on("limitChange", callback);
  }

  /**
   * Set if pagination is enabled
   */
  public pagination(enabled = true) {
    this.paginationEnabled = enabled;

    return this;
  }

  /**
   * Determine if pagination is enabled
   */
  public isPaginationEnabled() {
    return this.paginationEnabled;
  }

  /**
   * Cast pagination info
   */
  public castPaginationInfo(
    callback: (response: AxiosResponse) => PaginationInfo,
  ) {
    this.paginationInfoCast = callback;

    return this;
  }

  /**
   * Determine whether to enable or disable bulk selection
   */
  public enableBulkSelection(bulkSelection: boolean) {
    this.bulkSelection = bulkSelection;
    return this;
  }

  /**
   * Set table role
   */
  public setRole(role: string) {
    this.role = role;
    return this;
  }

  /**
   * Set table permissions
   */
  public setPermissions(permissions: TableProps["permissions"]) {
    this.permissions = permissions;

    return this;
  }

  /**
   * Check if table has role
   */
  public hasRole() {
    return !!this.role;
  }

  /**
   * Check if table has role permission
   */
  public hasPermission(permission: string) {
    if (this.permissions?.[permission] === false) return false;

    if (!this.hasRole()) return true;

    if (!this.user) return true;

    return this.user.can(`${this.role}.${permission}`);
  }

  /**
   * Get current user
   */
  public get user() {
    return getMoonlightConfig("user");
  }

  /**
   * Check if table allows the given permission
   * This should be used with actions, that needs to get the row and row index
   * Otherwise, use hasPermission
   */
  public allows(permission: string, ...args: any[]) {
    const permissionCallback = this.permissions?.[permission];

    if (!Is.callable(permissionCallback)) return this.hasPermission(permission);

    return permissionCallback(...args) === true;
  }

  /**
   * Determine if table forbids the given permission
   * This should be used with actions, that needs to get the row and row index
   * Otherwise, use hasPermission
   */
  public forbids(permission: string, ...args: any[]) {
    return !this.allows(permission, ...args);
  }

  /**
   * Get bulk selection status
   */
  public getBulkSelection(): boolean {
    return this.bulkSelection;
  }

  /**
   * Set filter options
   */
  public setFilterOptions(filterOptions: TableProps["filterOptions"]) {
    this.filterOptions = filterOptions;
    return this;
  }

  /**
   * Register bulk selection
   */
  public registerBulkSelection(
    bulkSelectionRow: BulkSelectionRow,
  ): RegisteredBulkSelectionRow {
    this.registeredBulkSelection.push(bulkSelectionRow);

    return {
      ...bulkSelectionRow,
      setChecked: (checked: boolean) => {
        bulkSelectionRow.setChecked(checked);

        // update the registered bulk selection
        this.registeredBulkSelection = this.registeredBulkSelection.map(
          registeredBulkSelectionRow => {
            if (
              registeredBulkSelectionRow.row === bulkSelectionRow.row &&
              registeredBulkSelectionRow.rowIndex === bulkSelectionRow.rowIndex
            ) {
              registeredBulkSelectionRow.checked = checked;
            }

            return registeredBulkSelectionRow;
          },
        );

        this.trigger("bulkSelection", this.registeredBulkSelection);
      },
      updateState: checked => {
        bulkSelectionRow.checked = checked;
        bulkSelectionRow.setChecked(checked);
      },
      unregister: () => {
        this.unregisterBulkSelection(
          bulkSelectionRow.row,
          bulkSelectionRow.rowIndex,
        );
      },
    };
  }

  /**
   * Unregister bulk selection
   */
  public unregisterBulkSelection(row: any, rowIndex) {
    this.registeredBulkSelection = this.registeredBulkSelection.filter(
      bulkSelectionRow => {
        return (
          bulkSelectionRow.row !== row || bulkSelectionRow.rowIndex !== rowIndex
        );
      },
    );

    return this;
  }

  /**
   * Toggle all bulk selection
   */
  public toggleAllBulkSelection(checked: boolean) {
    this.registeredBulkSelection.forEach(bulkSelectionRow => {
      bulkSelectionRow.setChecked(checked);
      bulkSelectionRow.checked = checked;
    });

    this.trigger("bulkSelection", this.registeredBulkSelection);

    return this;
  }

  /**
   * Get selected bulk rows
   */
  public getSelectedBulkRows() {
    return this.registeredBulkSelection.filter(
      bulkSelectionRow => bulkSelectionRow.checked,
    );
  }

  /**
   * Remove the given bulk rows
   */
  public removeBulkRows(rows: BulkSelectionRow[]) {
    this.registeredBulkSelection = this.registeredBulkSelection.filter(
      bulkSelectionRow => {
        return !rows.find(
          row =>
            row.row === bulkSelectionRow.row &&
            row.rowIndex === bulkSelectionRow.rowIndex,
        );
      },
    );

    return this;
  }

  /**
   * Set bulk actions
   */
  public setBulkActions(bulkActions: React.ComponentType<any>[]) {
    this.bulkActions = bulkActions;
    return this;
  }

  /**
   * Get Bulk Actions
   */
  public getBulkActions(): React.ComponentType<any>[] {
    return this.bulkActions.filter((Component: any) => {
      if (Component.permission) {
        return this.hasPermission(Component.permission);
      }

      return true;
    });
  }

  /**
   * Get create buttons
   */
  public getCreateButtons(): React.ComponentType<any>[] {
    return (this.buttons?.create || []).filter((Component: any) => {
      if (Component.permission) {
        return this.hasPermission(Component.permission);
      }

      return true;
    });
  }

  /**
   * Set table id
   */
  public setId(tableId: string) {
    this.tableId = tableId;
    this.props.id = tableId;
    return this;
  }

  /**
   * Determine whether to update url query string
   */
  public setUpdateQueryString(updateQueryString: boolean) {
    this.updateQueryString = updateQueryString;
    return this;
  }

  /**
   * Initialize table manager
   */
  public init() {
    if (!this.service) return;

    const cachedSortByOptions = this.getCached("sortByOptions");

    const params = queryString.all?.() || {};

    if (cachedSortByOptions) {
      this.sortByOptions = {
        ...cachedSortByOptions,
      };

      params.orderBy = [this.sortByOptions.name, this.sortByOptions.direction];
    }

    // Send the first request and filter it using query string (if has any)
    this.load(params);
  }

  /**
   * Load Data from service
   */
  public load(
    params: any = {},
    loadMode: LoadMode = "full",
  ): Promise<SuperTable> {
    return new Promise((resolve, reject) => {
      if (!this.service) {
        throw new Error("Service is not defined");
      }

      this.loadMode = loadMode;

      this.setLoading(true);

      this.queryParams = params;

      const finalParams = { ...params };

      if (this.defaultParams) {
        Object.assign(finalParams, this.defaultParams);
      }

      this.service
        .list(finalParams)
        .then(response => {
          scrollTop();
          this.setData(get(response.data, this.getKey("records")));
          this.setPaginationInfo(this.paginationInfoCast(response));
          this.setLoading(false);

          if (this.updateQueryString) {
            queryString.update?.(params);
          }

          if (finalParams.orderBy) {
            this.updateSortByOptions(finalParams.orderBy);
          }

          resolve(this);
        })
        .catch(error => {
          this.error = error;
          this.isLoading = false;
          this.setLoading(false);
          toastError(parseError(error));
          reject(error);
        });
    });
  }

  /**
   * Update sort by options
   */
  public updateSortByOptions(orderBy: string[]) {
    if (Is.empty(orderBy)) {
      return;
    }

    const [orderName, orderDirection] = orderBy;

    if (
      this.sortByOptions.name === orderName &&
      this.sortByOptions.direction === orderDirection
    )
      return;

    this.sortByOptions = {
      name: orderName,
      direction: orderDirection as "asc" | "desc",
      enabled: true,
    };

    this.cache("sortByOptions", this.sortByOptions);

    this.trigger("sortByOptions", this.sortByOptions);
  }

  /**
   * Set pagination info
   */
  public setPaginationInfo(paginationInfo: PaginationInfo) {
    this.paginationInfo = paginationInfo;

    this.trigger("paginationInfo", paginationInfo);

    return this;
  }

  /**
   * Update table loading state
   */
  public setLoading(loading: boolean) {
    this.isLoading = loading;

    events.trigger(`table.${this.tableName}.loading`, loading);
    return this;
  }

  /**
   * Go to the given page number
   */
  public goToPage(pageNumber: number, moreParams: any = {}) {
    moreParams.page = pageNumber;
    const paramsList = { ...this.queryParams, ...moreParams };

    if (this.lazyTable) {
      return this.load(paramsList);
    }

    this.trigger("pageChange", pageNumber, paramsList);
  }

  /**
   * Set table name
   */
  public setName(tableName: string) {
    this.tableName = tableName;
    this.tableFilterFromId = this.tableName + "-table-filter";
    this.cacheKey = `st-${this.tableName}`;

    return this;
  }

  /**
   * Set table title
   */
  public setTitle(title: string) {
    this.title = trans(title);
    return this;
  }

  /**
   * Get column by key
   */
  public getColumn(key: string) {
    return this.columns.find(column => column.key === key);
  }

  /**
   * Set table columns
   */
  public setColumns(columns: Column[]) {
    if (this.bulkSelection) {
      columns = [
        tableColumn("bulkSelection")
          .setHeading(trans("rowsControl"))
          .headingComponent(BulkSelectionHeading)
          .formatter(BulkSelectionFormatter)
          .validate(() => {
            return this.getBulkActions().length > 0;
          }),
        ...columns,
      ];
    }

    this.columns = columns.map((column: Column) => {
      if (column.data.prepare) {
        column.data.prepare(column, this);
      }

      return column;
    });

    const cachedDisplayedColumns = this.getCached("displayedColumns", []);

    const filteredColumns =
      cachedDisplayedColumns.length > 0
        ? this.columns.filter(column =>
            cachedDisplayedColumns.includes(column.data.key),
          )
        : this.columns.filter(column => {
            return ["always", "default"].includes(column.getDisplayMode());
          });

    this.displayedColumns = filteredColumns.map(this.parseColumn.bind(this));

    return this;
  }

  /**
   * Parse the given column
   */
  protected parseColumn(
    incomingColumn: Column,
    columnIndex: number,
  ): TablePlainColumn {
    const columnStyle = (column: TablePlainColumn) => {
      const style: React.CSSProperties = {};

      if (column.width) {
        style.width = column.width;
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
    };

    const column = incomingColumn.getData();

    return {
      ...column,
      column: incomingColumn,
      display: column.display || "always",
      className: column.className || "",
      style: { ...columnStyle(column), ...(column.style || {}) },
      headingStyle: {
        ...columnStyle(column),
        ...(column.headingStyle || {}),
      },
      heading:
        typeof column.heading === "string"
          ? trans(column.heading)
          : column.heading,
      render: (row: any, rowIndex: number) => {
        const value = get(row, column.key, column.defaultValue);

        const Formatter = column.formatter as React.ComponentType<any>;

        const editOptions = incomingColumn.getEditColumnOptions();

        let Wrapper: React.ComponentType<any> = React.Fragment;
        let wrapperProps = {};

        if (editOptions.enabled) {
          Wrapper = EditColumn;

          const FormComponent = createReactForm(reactiveForm => {
            reactiveForm
              .heading(trans("quickEdit"))
              .withResetButton(false)
              .withSaveAndClearButton(false)
              .closeOnEscape()
              .onSave(record => {
                this.updateRow(record, rowIndex);
              })
              .setInputs(
                editOptions.inputs({ row, rowIndex, column: incomingColumn }),
              )
              .submitter((event: React.FormEvent, form: FormInterface) => {
                const formElement = event.target as HTMLFormElement;
                return editOptions.onEdit({
                  row,
                  rowIndex,
                  column: incomingColumn,
                  form,
                  formElement,
                  values: serialize(formElement, true),
                });
              });
          });

          wrapperProps = {
            ...editOptions,
            row,
            rowIndex,
            column: incomingColumn,
            FormComponent,
          };
        }

        const children = column.formatter ? (
          <Formatter
            {...{
              row,
              rowIndex,
              column,
              key: column.key,
              columnIndex,
              value,
              defaultValue: column.defaultValue,
              settings: column.settings || {},
            }}
          />
        ) : (
          value
        );

        return <Wrapper {...wrapperProps}>{children}</Wrapper>;
      },
    };
  }

  /**
   * Reset displayed columns
   */
  public resetDisplayedColumns() {
    this.displayedColumns = this.columns
      .filter(column => ["always", "default"].includes(column.getDisplayMode()))
      .map(this.parseColumn.bind(this));

    const cachedData = this.cacheHandler?.get(this.cacheKey, {}) || {};

    delete cachedData.displayedColumns;

    this.cacheHandler && this.cacheHandler.set(this.cacheKey, cachedData);

    this.trigger("displayedColumns", this.displayedColumns);

    return this;
  }

  /**
   * Get the given cached key
   */
  public getCached(key: string, defaultValue: any = null) {
    if (!this.cacheHandler) return defaultValue;

    const cachedData = this.cacheHandler.get(this.cacheKey, {});
    return cachedData[key] !== undefined ? cachedData[key] : defaultValue;
  }

  /**
   * Set displayed columns
   */
  public setDisplayedColumns(displayedColumns: string[]) {
    this.cache("displayedColumns", displayedColumns);
    this.displayedColumns = this.columns
      .filter(column => displayedColumns.includes(column.data.key))
      .map(this.parseColumn.bind(this));

    this.trigger("displayedColumns", displayedColumns);
    return this;
  }

  /**
   * Cache the given value
   */
  public cache(key: string, value: any) {
    if (!this.cacheHandler) return;
    const cacheData = this.cacheHandler.get(this.cacheKey, {}); // st => super table
    cacheData[key] = value;

    this.cacheHandler.set(this.cacheKey, cacheData);
  }

  /**
   * Get only the columns that are marked as displayed
   */
  public getDisplayedColumns() {
    return this.displayedColumns.filter(column => {
      if (column.validate) {
        return column.validate(column, this);
      }

      return true;
    });
  }

  /**
   * Set table service
   */
  public setService(service: RestfulEndpoint) {
    this.service = service;
    return this;
  }

  /**
   * Set default params to be used when loading records
   */
  public setDefaultParams(params: any) {
    this.defaultParams = params;
    return this;
  }

  /**
   * Set table props
   */
  public setProps(props: any) {
    this.props = props;
    return this;
  }

  /**
   * Set table data
   */
  public setData(data: any[]) {
    const dataChanged = data !== this.data;

    this.data = data.map(data => {
      if (!data.uniqueId) {
        data.uniqueId = Random.string(36);
      }

      return data;
    });

    if (dataChanged) {
      this.trigger("data", data);
    }

    return this;
  }

  /**
   * Listen to loading event
   */
  public onLoading(callback: (loading: boolean) => void): EventSubscription {
    return this.on("loading", callback);
  }

  /**
   * Listen to the given event
   */
  public on(
    event: TableEvent,
    callback: (...args: any[]) => void,
  ): EventSubscription {
    return events.subscribe(`table.${this.tableName}.${event}`, callback);
  }

  /**
   * Trigger the given event with the given data
   */
  public trigger(event: TableEvent, ...args: any[]) {
    events.trigger(`table.${this.tableName}.${event}`, ...args);
    return this;
  }

  /**
   * Set table buttons
   */
  public setButtons(buttons: TableHeaderButtons) {
    this.buttons = buttons;
    return this;
  }

  /**
   * Set base form
   */
  public setBaseForm(baseForm: React.FC<any>) {
    this.baseForm = baseForm;
    return this;
  }

  /**
   * Delete table row
   */
  public deleteRow(row: any, rowIndex: number) {
    const deleteRowFromTable = () => {
      this.data.splice(rowIndex, 1);
      this.setData([...this.data]);
      // TODO: Translate the message

      this.decreasePaginationInfoRow(1);
    };

    if (this.service) {
      const loader = toastLoading(
        trans("deletingInProgress"),
        trans("deleting"),
      );

      this.service
        .delete(row.id)
        .then(() => {
          deleteRowFromTable();
          loader.success(trans(moonlightTranslations.deleteSuccess));
        })
        .catch(error => {
          loader.error(
            parseError(error),
            trans(moonlightTranslations.deleteError),
          );
        });
    } else {
      deleteRowFromTable();
    }
  }

  /**
   * Update table row
   */
  public updateRow(row: any, rowIndex: number) {
    this.data[rowIndex] = row;
    this.setData([...this.data]);
  }

  /**
   * Push new row to the end of table
   */
  public pushRow(row: any) {
    this.data.push(row);
    this.setData([...this.data]);

    this.increasePaginationInfoRow(1);
  }

  /**
   * Add row to the start of the table
   */
  public unshiftRow(row: any) {
    this.data.unshift(row);
    this.setData([...this.data]);

    this.increasePaginationInfoRow(1);
  }

  /**
   * Increase pagination info with the given number of rows
   */
  public increasePaginationInfoRow(numberOfRows: number) {
    this.paginationInfo.total += numberOfRows;
    this.paginationInfo.results += numberOfRows;
    this.paginationInfo.pages = Math.ceil(
      this.paginationInfo.total / this.paginationInfo.limit,
    );

    this.setPaginationInfo(this.paginationInfo);
  }

  /**
   * Decrease pagination info with the given number of rows
   */
  public decreasePaginationInfoRow(numberOfRows: number) {
    this.paginationInfo.total -= numberOfRows;
    this.paginationInfo.results -= numberOfRows;
    this.paginationInfo.pages = Math.ceil(
      this.paginationInfo.total / this.paginationInfo.limit,
    );

    this.setPaginationInfo(this.paginationInfo);
  }

  /**
   * Reset the table properties
   */
  public reset() {
    this.data = [];
    this.title = "";
    this.columns = [];
    this.tableName = "";
    this.service = undefined;
    this.isLoading = false;
    this.props = {};
    this.filters = [];
    this.error = undefined;
    this.baseForm = undefined;
    this.queryParams = {};

    this.paginationInfo = {
      page: 1,
      results: 0,
      limit: 1,
      total: 0,
      pages: 0,
    };
    this.buttons = {
      actions: [],
      create: [],
    };
  }

  /**
   * Sort callback
   */
  protected sortCallback: any;

  /**
   * Original data
   */
  protected originalData: any[] | undefined;

  /**
   * Set sort callback
   */
  public setSortMethod(callback: any) {
    this.sortCallback = callback;

    return this;
  }

  /**
   * Set table original data
   * Works only when the table is not using a service
   */
  public setOriginalData(data?: any[]) {
    if (!data || this.originalData) return this;

    this.originalData = data;

    return this;
  }

  /**
   * Set table filters
   */
  public setFilters(filters: TableFilter[]) {
    this.filters = filters;
    return this;
  }

  /**
   * Manager table filters to return it properly
   */
  public getFilters(): TableFilter[] {
    return this.filters.map(filter => {
      let Component = filter.component;
      if (filter.type) {
        switch (filter.type) {
          case "text":
            Component = TextInput;
            break;
          case "number":
            Component = NumberInput;
            break;
          case "float":
            Component = FloatInput;
            break;
          case "integer":
            Component = IntegerInput;
            break;
          case "select":
            Component = SelectInput;
            break;
          case "multiSelect":
            Component = SelectInput;
            break;
          case "switch":
            Component = SwitchInput;
            break;
          case "date":
            Component = DatePickerInput;
            break;
          default:
            Component = TextInput;
            break;
        }
      }

      filter.component = Component;

      const componentProps = filter.componentProps || {};

      componentProps.name = filter.name;

      if (filter.placeholder) {
        componentProps.placeholder = trans(filter.placeholder);
      }

      if (
        filter.type &&
        ["switch", "checkbox"].includes(filter.type) &&
        queryString.get?.(filter.name)
      ) {
        componentProps.defaultChecked = true;
      } else {
        componentProps.defaultValue =
          queryString.get?.(filter.name) ||
          componentProps.defaultValue !== undefined
            ? componentProps.defaultValue
            : "";
      }

      filter.componentProps = componentProps;

      return filter;
    });
  }

  /**
   * Listen to the input change
   */
  public onFilterInputChange(_e: any) {
    // this is used to prevent the form from submitting when is being reset
    if (this.isResettingFilter) return;

    // wait for some time to make sure the user has finished typing or selection
    debounce(() => {
      if (this.filterOptions?.loadOnChange) {
        const form = getForm(this.tableFilterFromId);

        if (form) {
          this.loadFilter(form);
        }
      }
    }, 300);
  }

  /**
   * Submit filter form for filtering table data
   */
  public submitFilter(_e: React.FormEvent, form: FormInterface) {
    this.loadFilter(form);
  }

  /**
   * Load filter for the given form
   */
  public loadFilter(form: FormInterface) {
    if (this.isLoading) return;

    // const params: Record<string, any> = form.values();
    const params: Record<string, any> = serialize(form.formElement, true);

    // reset page to 1
    params.page = 1;

    this.load(params, "partial").then(() => {
      form.submitting(false);
    });
  }

  /**
   * Get initial filter open state
   */
  public isFiltersOpened() {
    return this.getCached("filterState", Is.desktop());
  }

  /**
   * Update filter state in cache
   */
  public updateFiltersState(state: boolean) {
    this.cache("filterState", state);

    return this;
  }

  /**
   * Reset table filters
   */
  public resetFilters() {
    const tableFilterForm = getForm(this.tableFilterFromId) as FormInterface;
    this.isResettingFilter = true;
    this.load(this.currentQueryString).then(() => {
      tableFilterForm.reset();
      setTimeout(() => {
        this.isResettingFilter = false;
      }, 0);
    });
  }

  /**
   * Sort by the given name and order
   */
  public sortBy(name: string, order: "asc" | "desc" = "asc") {
    this.goToPage(1);

    if (!this.service) {
      this.updateSortByOptions([name, order]);

      let sortCallback: any = this.sortCallback;

      if (!sortCallback) {
        sortCallback = (a: any, b: any) => {
          const aValue = get(a, name);
          const bValue = get(b, name);

          if (aValue > bValue) return order === "asc" ? 1 : -1;

          if (aValue < bValue) return order === "asc" ? -1 : 1;

          return 0;
        };
      } else {
        sortCallback = sortCallback(name, order);
      }

      return this.setData([...this.data.sort(sortCallback)]);
    }

    const tableFilterForm = getForm(this.tableFilterFromId) as FormInterface;
    this.isResettingFilter = true;

    // const values = tableFilterForm.values();
    const values = serialize(tableFilterForm.formElement, true);

    values.orderBy = [name, order];

    this.load(values);
  }

  /**
   * Update limit
   */
  public updateLimit(limit: number) {
    // this.goToPage(1);
    // this.trigger("limitChange", limit);

    if (!this.service && this.originalData) {
      const newData = this.originalData.slice(0, limit);
      this.setPaginationInfo({
        ...this.paginationInfo,
        results: newData.length,
        pages: Math.ceil(this.originalData.length / limit),
        page: 1,
        limit,
      });

      this.setData(newData);
      return;
    }

    const tableFilterForm = getForm(this.tableFilterFromId) as FormInterface;
    this.isResettingFilter = true;

    // const values = tableFilterForm.values();
    const values = serialize(tableFilterForm.formElement, true);

    values.limit = limit;

    this.load(values);
  }
}
