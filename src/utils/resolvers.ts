import { getMoonlightConfig } from "../config";

export const queryString = () => getMoonlightConfig("router.queryString");

export const components = {
  link: getMoonlightConfig("components.link"),
  Helmet: () => getMoonlightConfig("components.helmet"),
};

export const router = {
  currentRoute: () => getMoonlightConfig("router.currentRoute")(),
  navigateTo: (...args: any) =>
    getMoonlightConfig("router.navigateTo")(...args),
  notFoundRoute: () => getMoonlightConfig("router.notFoundRoute") || "/404",
};
