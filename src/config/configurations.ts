import { trans } from "@mongez/localization";
import { get, merge } from "@mongez/reinforcements";
import { moonlightTranslations } from "../locales";
import { MoonlightConfigurations } from "./types";

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
    keys: {
      records: "records",
      record: "record",
      createRecord: "record",
      updateRecord: "record",
    },
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
    submitButton: {
      label: trans(moonlightTranslations.submit),
    },
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
