import { ColSpan } from "@mantine/core/lib/Grid/Col/Col.styles";
import Endpoint from "@mongez/http";
import { AxiosResponse } from "axios";
import React from "react";
import { PaginationInfo } from "../components";

export type MoonlightConfigurations = {
  localeCodes?: {
    [key: string]: {
      name: string;
      direction: "rtl" | "ltr";
      flag?: any;
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
    responseCallback?: (response: any) => any;
    key?: string;
  };
  table?: {
    recordsKey?: string;
    recordKey?: string;
    createRecordKey?: string;
    updateRecordKey?: string;
    limitOptions?: number[];
    actions?: React.ComponentType<any>[];
    paginationInfo?: (response: AxiosResponse) => PaginationInfo;
  };
};
