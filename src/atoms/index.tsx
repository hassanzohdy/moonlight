import cache from "@mongez/cache";
import { userPrefersDarkMode } from "@mongez/dom";
import { atom } from "@mongez/react-atom";

const themeCacheKey = "dr-theme";

const defaultThemeValue = cache.get(
  themeCacheKey,
  userPrefersDarkMode() ? "dark" : "light"
);

export const themeAtom = atom({
  key: "moonlight-theme",
  default: {
    mode: defaultThemeValue,
    paper: {
      color: defaultThemeValue === "light" ? "black" : "white",
      backgroundColor: defaultThemeValue === "light" ? "white" : "black",
    },
    get isDarkMode() {
      return this.mode === "dark";
    },
    toggleTheme() {
      const mode = themeAtom.get("mode");
      const updateTheme = themeAtom.get("updateTheme");
      updateTheme(mode === "light" ? "dark" : "light");
    },
    updateTheme(newTheme: "light" | "dark") {
      // update theme in storage
      cache.set(themeCacheKey, newTheme);
      // trigger update event
      themeAtom.update({
        ...themeAtom.value,
        mode: newTheme,
        paper: {
          color: newTheme === "light" ? "black" : "white",
          backgroundColor: newTheme === "light" ? "white" : "black",
        },
      });
    },
  },
});

export const isDarkMode = () => themeAtom.get("mode") === "dark";
