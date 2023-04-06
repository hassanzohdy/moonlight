import { getMoonlightConfig } from "../config";
import { currentLocaleCode } from "../utils/helpers";

export const getGoogleMapApiKey = () => getMoonlightConfig("google.map.apiKey");

export function getAddressByLatLng(lat: number, lng: number) {
  return new Promise((resolve, reject) => {
    const params = {
      latlng: `${lat},${lng}`,
      language: currentLocaleCode(),
      key: getGoogleMapApiKey(),
    };
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;

    fetch(getUrl(url, params)).then(response => {
      response.json().then(resolve).catch(reject);
    });
  });
}

function getUrl(url: string, params: any) {
  return url + "?" + new URLSearchParams(params).toString();
}

export function getAddressByPlaceId(placeId: string) {
  return new Promise((resolve, reject) => {
    const params = {
      language: currentLocaleCode(),
      key: getGoogleMapApiKey(),
      place_id: placeId,
    };

    const url = `https://maps.googleapis.com/maps/api/geocode/json`;

    fetch(getUrl(url, params)).then(response => {
      response.json().then(resolve).catch(reject);
    });
  });
}
