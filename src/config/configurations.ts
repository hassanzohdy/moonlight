import { ColSpan } from "@mantine/core/lib/Grid/Col/Col.styles";
import Endpoint from "@mongez/http";
import { get, merge } from "@mongez/reinforcements";
import { AxiosResponse } from "axios";
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

const defaultConfigurations: MoonlightConfigurations = {
  localeCodes: {},
  endpoint: undefined,
  autoDetectDarkMode: true,
  date: {
    dateFormat: "dd-MM-yyyy",
  },
  google: {
    map: {
      apiKey: "",
      zoom: 18,
      libraries: [
        "drawing",
        "geometry",
        "localContext",
        "places",
        "visualization",
      ],
      center: {
        lat: 30.044399831543025, // Tahrir Square
        lng: 31.235718727111816,
      },
    },
  },
  select: {
    responseDataKey: "records",
  },
  table: {
    recordsKey: "records",
    recordKey: "record",
    createRecordKey: "record",
    updateRecordKey: "record",
    limitOptions: [10, 20, 50, 100, 200, 250, 500],
    paginationInfo: (response) => {
      return {
        limit: response.data.paginationInfo?.limit,
        page: response.data.paginationInfo?.page,
        pages: response.data.paginationInfo?.pages,
        results: response.data.paginationInfo?.results,
        total: response.data.paginationInfo?.total,
      };
    },
  },
  reactiveForm: {
    singleRecordKey: "record",
    defaultColSize: 12,
    openInModal: false,
  },
};

let currentConfigurations = { ...defaultConfigurations };

export function setMoonlightConfigurations(
  configurations: MoonlightConfigurations
) {
  currentConfigurations = merge(currentConfigurations, configurations);
}

export function getMoonlightConfigurations() {
  return currentConfigurations;
}

export function getMoonlightConfig(key: string, defaultValue?: any) {
  return get(currentConfigurations, key, defaultValue);
}

export function googleMapConfig(key: string, defaultValue?: any) {
  return get(currentConfigurations, `google.map.${key}`, defaultValue);
}
