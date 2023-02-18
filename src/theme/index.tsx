import { useMantineTheme } from "@mantine/core";
import { DEFAULT_THEME, MantineTheme } from "@mantine/core";
import { atom } from "@mongez/react-atom";

export const themeAtom = atom<MantineTheme>({
  key: "moonlight-theme",
  default: DEFAULT_THEME,
});

export function InjectThemeAtom() {
  const theme = useMantineTheme();
  themeAtom.update(theme);
  return null;
}

export const isDarkMode = () => themeAtom.get("colorScheme") === "dark";
