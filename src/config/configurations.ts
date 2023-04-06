import { trans } from "@mongez/localization";
import { get, merge } from "@mongez/reinforcements";
import { moonlightTranslations } from "../locales";
import { components } from "../utils/resolvers";
import { MoonlightConfigurations } from "./types";

const defaultConfigurations: Partial<MoonlightConfigurations> = {
  localeCodes: {},
  current: {
    autoDetect: true,
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
  form: {
    select: {
      responseDataKey: "records",
    },
    date: {
      dateFormat: "dd-MM-yyyy",
    },
  },
  table: {
    keys: {
      records: "records",
      record: "record",
      createRecord: "record",
      updateRecord: "record",
    },
    limitOptions: [10, 15, 20, 50, 100, 200, 250, 500],
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

  currentConfigurations.router = configurations.router;

  if (configurations.components) {
    currentConfigurations.components = configurations.components;

    // merge configurations components with components const
    Object.assign(components, configurations.components);
  }
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
