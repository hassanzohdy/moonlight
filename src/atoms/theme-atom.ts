import { DEFAULT_THEME, MantineTheme } from "@mantine/core";
import { atom } from "@mongez/react-atom";

export const themeAtom = atom<MantineTheme>({
  key: "moonlight-theme",
  default: DEFAULT_THEME,
});
