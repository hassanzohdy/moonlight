import { ColSpan } from "@mantine/core/lib/Grid/Col/Col.styles";
import Endpoint from "@mongez/http";
import { AxiosResponse } from "axios";
import React from "react";
import { PaginationInfo } from "../components";
import { Fileable } from "../components/Form/DropzoneInput.types";
import { TableKeys } from "../components/Table/TableProps";

export type MoonlightConfigurations = {
  /**
   * Available locale codes in the app
   */
  localeCodes: {
    /**
     * Locale code as key
     * i.e `en` or `ar`
     */
    [key: string]: {
      /**
       * Language name, recommended to be written in its own language
       */
      name: string;
      /**
       * Direction of the language
       */
      direction: "rtl" | "ltr";
    };
  };
  /**
   * The following configurations are used to detect the current locale code and direction
   */
  current?: {
    /**
     * Get current direction
     */
    direction?: () => "rtl" | "ltr";
    /**
     * Get current locale code
     */
    localeCode?: () => string;
    /**
     * If direction and/or localeCode handlers are not provided, and this is set to true, then the app will try to detect the current locale code and direction
     * From the html tag's `lang` attribute and `dir` attribute
     *
     * @default true
     */
    autoDetect?: boolean;
  };
  /**
   * Current user object
   */
  user?: {
    /**
     * Determine if the current user has the given permission
     */
    can: (permission: string) => boolean;
    /**
     * Any other data related to the current user
     */
    [key: string]: any;
  };
  cache?: {
    handler: {
      set: (key: string, value: any) => any;
      get: (key: string, defaultValue?: any) => any;
    };
  };
  /**
   * Components to be used in the app
   */
  components?: {
    /**
     * Link component is used for navigation
     */
    link?: React.ComponentType<any>;
    helmet?: React.ComponentType<any>;
  };
  router: {
    /**
     * A function that returns the current route
     */
    currentRoute: () => string;
    /**
     * Navigate to the given route
     */
    navigateTo: (route: string) => any;
    /**
     * Not found route
     *
     * @default "/404"
     */
    notFoundRoute: string;
    /**
     * Query string options
     */
    queryString?: {
      /**
       * Get all query parameters
       */
      all: () => Record<string, any>;
      /**
       * Update query parameters
       */
      update: (query: Record<string, any>) => any;
      /**
       * Get a specific query parameter
       *
       * It should also accept a default value as the second parameter
       */
      get: (key: string, defaultValue?: any) => any;
      /**
       * Any other query string options won't be used
       */
      [key: string]: any;
    };
  };
  reactiveForm?: {
    /**
     * Used when fetching single document from api using service.get method
     *
     * @default record
     */
    singleRecordKey?: string;
    /**
     * Input column size
     * Full width is 12 columns
     *
     * @default 6
     */
    defaultColSize?: ColSpan;
    /**
     * Whether to show the form in a modal or not
     *
     * @default true
     */
    openInModal?: boolean;
    /**
     * What to send when submitting the form
     * If your form contains uploadable files, then it is advised to use `formData`
     * Otherwise, json is better
     * You can override each form submit format using `submitFormat` method
     *
     * @todo: Auto detect if the form contains uploadable files
     * @default "json"
     */
    submitFormat?: "json" | "formData";
    /**
     * The delay in milliseconds after the form is saved
     * Works only when service is used not `onSubmit` method
     */
    saveEventDelay?: number;
    /**
     * Submit button options
     */
    submitButton?: {
      label?: React.ReactNode;
    };
  };
  /**
   * Form options
   */
  form?: {
    /**
     * Form date picker options
     */
    date?: {
      /**
       * Set default date format
       *
       * @default "dd-MM-yyyy"
       */
      dateFormat?: string;
    };
    /**
     * Select options
     */
    select?: {
      /**
       * Request response data key
       * Can be overridden in the select component using `responseDataKey` prop
       * @default "records"
       */
      responseDataKey?: string;
    };
  };
  /**
   * Published/active column name
   *  This is used with publishedInput in reactive form and with publishedColumn in Super table
   * @default {
   *  name: "published",
   * label: "active"
   * }
   */
  publishedColumn?: {
    name: string;
    label: string;
  };
  endpoint?: Endpoint;
  google?: {
    map?: {
      apiKey: string;
      zoom?: number;
      libraries?: string[];
      center?: {
        lat: number;
        lng: number;
      };
    };
  };
  uploads?: {
    route?: string;
    deleteRoute?: string;
    resolveResponse?: (response: AxiosResponse) => Fileable[];
    key?: string;
  };
  /**
   * Super table options
   */
  table?: {
    /**
     * Table data keys
     */
    keys?: TableKeys;
    /**
     * Limit options
     */
    limitOptions?: number[];
    /**
     * If set to true, then when updating record or cloning it, it will fetch first data from api,
     * otherwise, it will be taken from the current table row
     *
     * @default false
     */
    fetchRecord?: boolean;
    /**
     * List of actions used by default when calling actionColumn
     *
     * @default [EditButton, DeleteButton]
     */
    actions?: React.ComponentType<any>[];
    paginationInfo?: (response: AxiosResponse) => PaginationInfo;
  };
};
