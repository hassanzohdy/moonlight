import type { RestfulEndpoint } from "@mongez/http";
import type { FormInterface } from "@mongez/react-form";
import type { AxiosResponse } from "axios";
import type React from "react";
import type { InputBuilder } from "../../form-builder/components/InputBuilder";
import type { Column } from "./Column";
import type { PaginationInfo, SuperTable } from "./SuperTable";

export type FormatterProps = {
  /**
   * Current row data
   */
  row: any;
  /**
   * Current row index
   */
  rowIndex: number;
  /**
   * Current column index
   */
  columnIndex: number;
  /**
   * Column object
   */
  column: Column;
  /**
   * Cell Value
   */
  value: any;
  /**
   * Cell key
   */
  key: string | number;
  /**
   * Column settings that will be passed to the formatter
   */
  settings: any;
  /**
   * Default value if cell value is not returned from api
   */
  defaultValue: any;
  /**
   * Super table instance
   */
  superTable: SuperTable;
};

export type TableColumnFormatter =
  | React.FC<FormatterProps>
  | ((formatterProps: FormatterProps) => React.ReactNode);

export type TableColumnDisplay = "always" | "default" | "optional";

export type TablePlainColumn = {
  key: string;
  display?: TableColumnDisplay;
  settings?: any;
  defaultValue?: any;
  heading?: React.ReactNode;
  headingComponent?: React.ComponentType<any>;
  headingStyle?: React.CSSProperties;
  formatter?: TableColumnFormatter;
  className?: string;
  align?: React.CSSProperties["textAlign"];
  width?: number | string;
  style?: React.CSSProperties;
  prepare?: (column: Column, superTable: SuperTable) => void;
  validate?: (column: Column, superTable: SuperTable) => boolean;
  column?: Column;
};

export type EditColumnCallback = (params: {
  row: any;
  rowIndex: number;
  column: Column;
  form: FormInterface;
  values: Record<string, any>;
}) => Promise<any>;

export type SortDirection = "asc" | "desc";

export type ColumnSortBy = {
  name: string;
  direction: SortDirection;
  enabled: boolean;
};

export type EditOptions = {
  inputs: (params: {
    row: any;
    column: Column;
    rowIndex: number;
  }) => InputBuilder[];
  onEdit: EditColumnCallback;
  enabled?: boolean;
};

export type TableColumn = Column;

export type TableFilter = {
  name: string;
  placeholder?: string;
  type?:
    | "text"
    | "email"
    | "number"
    | "integer"
    | "float"
    | "date"
    | "select"
    | "radio"
    | "switch"
    | "checkbox"
    | "multiSelect";
  componentProps?: any;
  component?: React.FC<any>;
  width?: number;
  wrapperProps?: any;
};

export type SuperTableCreateButtonProps = {
  form: React.FC<any>;
};

export type TableCreateButton = React.FC<SuperTableCreateButtonProps>;

export type TableFormProps = {
  open: boolean;
  onClose: () => void;
  onSave: (record: any) => void;
  record?: any;
};

export type TableKeys = {
  records?: string;
  record?: string;
  createRecord?: string;
  updateRecord?: string;
};

export type SuperTableShortKeys = {
  keys: string[];
  description: string;
  order?: number;
  once?: boolean;
};

export type TableProps = {
  /**
   * Table name
   */
  name?: string;
  /**
   * Table title
   */
  title?: string;
  /**
   * Table route
   *
   * @default current route
   */
  route?: string;
  /**
   * Table root id
   */
  rootId?: string;
  /**
   * Table description
   */
  description?: string;
  /**
   * Enable shortcuts
   */
  shortcuts?: boolean;
  /**
   * Display table header
   */
  displayHeader?: boolean;
  /**
   * Whether to show columns selections
   */
  columnsSelections?: boolean;
  /**
   * Base roles for table
   * All permissions will be prefixed with the role name
   * i.e the table list will be `role.list`, create will be `role.create`, etc.
   *
   * @default table name
   */
  role?: string;
  /**
   * Whether to update the title of the page
   *
   * @default true
   */
  withHelmet?: boolean;
  /**
   * Default record to be used when creating new records
   */
  defaultRecord?: {
    [key: string]: any;
  };
  /**
   * Table Permissions
   * This can override the role permission, for example if user has access to `users.create`
   * And the `create` permission is set to false, the user will not be able to create new users.
   */
  permissions?: {
    /**
     * Determine if user can list table records
     * @default true
     */
    list?: boolean;
    /**
     * Determine if user can create new records
     */
    create?: boolean;
    /**
     * Determine if user can update records
     */
    update?: boolean | ((record: any, index: number) => boolean);
    /**
     * Determine if user can delete records
     */
    delete?: boolean | ((record: any, index: number) => boolean);
  };
  /**
   * Whether to fetch records from server when editing or cloning
   */
  fetchRecord?: boolean;
  /**
   * Table Columns
   */
  columns: TableColumn[];
  /**
   * Table header buttons
   */
  createButtons?: TableCreateButton[];
  /**
   * Table filters
   */
  filters?: TableFilter[];
  /**
   * Filter options
   */
  filterOptions?: {
    /**
     * Load on change
     *
     * @default true
     */
    loadOnChange?: boolean;
  };
  /**
   * Table base form
   */
  form?: React.FC<any>;
  /**
   * Table Data
   */
  data?: any[];
  /**
   * Determine if table is a lazy table to load its data
   * If data is set, it will be automatically set to false
   * @default true
   */
  lazy?: boolean;
  /**
   * Determine if table is being loaded
   */
  isLoading?: boolean;
  /**
   * Service Handler
   * Used to fetch data from server
   *
   * @lazy prop must be set to true
   */
  service?: RestfulEndpoint;
  /**
   * Default params to be send with each list request
   *
   * @lazy prop must be set to true
   */
  defaultParams?: Record<string, any>;
  /**
   * Determine whether to highlight the rows when hovering over them.
   *
   * @default true
   */
  hovered?: boolean;
  /**
   * Determine whether to update query string
   * when table is sorted, filtered, or paged.
   *
   * @default true
   */
  updateQueryString?: boolean;
  /**
   * Enable bulk selection for bulk actions.
   * If set to false, bulk actions will be disabled.
   *
   * @default true
   */
  bulkSelection?: boolean;
  /**
   * Bulk actions list
   */
  bulkActions?: React.ComponentType<any>[];
  /**
   * Triggered when table is sorted
   */
  onSortChange?: (columnName: string, sortDirection: SortDirection) => void;
  /**
   * Triggered when table is sorted
   */
  sortCallback?: (
    columnName: string,
    sortDirection: SortDirection,
  ) => (a: any, b: any) => number;
  /**
   * Triggered when table is filtered
   *
   * Used when `lazy` is set to `false`
   */
  onFilterChange?: (filters: Record<string, any>) => void;
  /**
   * Wether to enable pagination
   *
   * @default true
   */
  pagination?: boolean;
  /**
   * Limit size
   *
   * @default 10
   */
  limit?: number;
  /**
   * Triggered when page is changed
   * Used when `lazy` is set to `false`
   */
  onPageChange?: (page: number) => void;
  /**
   * Triggered when page size is changed
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Current page
   * Please note that this is a controlled prop, so you need to update the page yourself
   * It can be used with `onPageChange` to update the page
   * If lazy is enabled, it will be disabled
   *
   * @default 1
   */
  page?: number;
  /**
   * Total pages
   * Used when `lazy` is set to `false`
   *
   * @default automatically calculated
   */
  totalPages?: number;
  /**
   * Total records
   * Used when `lazy` is set to `false`
   */
  total?: number;
  /**
   * Limit options
   * If set to false, limit options will be hidden
   *
   * @default [15, 25, 50, 100]
   */
  limitOptions?: number[] | false;
  /**
   * Whether to Scroll to top page | table root when table is sorted, filtered, or paged
   *
   * @default table
   */
  scrollTo?: "table" | "top" | false;
  /**
   * Cast pagination info from response
   * Used only with lazy enabled
   * Can be set in the configurations settings
   */
  responsePaginationHandler?: (response: AxiosResponse) => PaginationInfo;
  /**
   * Response data handler
   * Can be set in the configurations settings
   */
  responseDataHandler?: (response: AxiosResponse) => any[];
  /**
   * Resolving keys for dynamic response
   */
  keys?: TableKeys;
};
