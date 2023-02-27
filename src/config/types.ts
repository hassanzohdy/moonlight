import { ColSpan } from "@mantine/core/lib/Grid/Col/Col.styles";
import Endpoint from "@mongez/http";
import { AxiosResponse } from "axios";
import React from "react";
import { PaginationInfo } from "../components";
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
  user?: {
    can: (permission: string) => boolean;
    [key: string]: any;
  };
  cache?: {
    handler: {
      set: (key: string, value: any) => any;
      get: (key: string, defaultValue?: any) => any;
    };
  };
  components?: {
    link?: React.ComponentType<any>;
    helmet?: React.ComponentType<any>;
  };
  router: {
    currentRoute: () => string;
    navigateTo: (route: string, params?: any) => any;
    notFoundRoute: string;
    queryString?: {
      all: () => {
        [key: string]: any;
      };
      update: (query: any) => any;
      get: (key: string, defaultValue?: any) => any;
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
  select?: {
    responseDataKey?: string;
  };
  endpoint?: Endpoint;
  date?: {
    dateFormat?: string;
  };
  google?: {
    map?: {
      apiKey: string;
      zoom?: number;
      libraries?: string[];
      center: {
        lat: number;
        lng: number;
      };
    };
  };
  uploads?: {
    route?: string;
    deleteRoute?: string;
    resolveResponse?: (response: any) => any;
    key?: string;
  };
  table?: {
    keys?: TableKeys;
    limitOptions?: number[];
    actions?: React.ComponentType<any>[];
    paginationInfo?: (response: AxiosResponse) => PaginationInfo;
  };
};
