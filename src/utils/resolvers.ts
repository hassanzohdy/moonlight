import { getMoonlightConfig } from "../config";

export const queryString = {
  all: getMoonlightConfig("router.queryString.all"),
  update: getMoonlightConfig("router.queryString.update"),
  get: getMoonlightConfig("router.queryString.get"),
};

export const components = {
  link: getMoonlightConfig("components.link"),
  Helmet: getMoonlightConfig("components.helmet"),
};

export const router = {
  currentRoute: getMoonlightConfig("router.currentRoute"),
  navigateTo: getMoonlightConfig("router.navigateTo"),
  notFoundRoute: getMoonlightConfig("router.notFoundRoute"),
};
