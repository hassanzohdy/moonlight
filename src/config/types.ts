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
    singleRecordKey?: string;
    defaultColSize?: ColSpan;
    openInModal?: boolean;
    /**
     * The delay in milliseconds after the form is saved
     * Works only when service is used not `onSubmit` method
     */
    saveEventDelay?: number;
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
  table?: {
    keys?: TableKeys;
    limitOptions?: number[];
    actions?: React.ComponentType<any>[];
    paginationInfo?: (response: AxiosResponse) => PaginationInfo;
  };
};
