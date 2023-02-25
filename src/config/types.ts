import { ColSpan } from "@mantine/core/lib/Grid/Col/Col.styles";
import Endpoint from "@mongez/http";
import { AxiosResponse } from "axios";
import React from "react";
import { PaginationInfo } from "../components";
import { TableKeys } from "../components/Table/TableProps";

export type MoonlightConfigurations = {
  localeCodes?: {
    [key: string]: {
      name: string;
      direction: "rtl" | "ltr";
      flag?: any;
    };
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
  router?: {
    currentRoute?: () => string;
    navigateTo?: (route: string, params?: any) => any;
    notFoundRoute?: string;
    queryString?: {
      all: () => {
        [key: string]: any;
      };
      update: (query: any) => any;
      get: (key: string, defaultValue?: any) => any;
      [key: string]: any;
    };
  };
  current?: {
    direction?: () => "rtl" | "ltr";
    localeCode?: () => string;
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
  autoDetectDarkMode?: boolean;
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
  table?: TableKeys;
    limitOptions?: number[];
    actions?: React.ComponentType<any>[];
    paginationInfo?: (response: AxiosResponse) => PaginationInfo;
  };
};
