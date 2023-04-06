import { useMantineTheme } from "@mantine/core";
import { themeAtom } from "../atoms/theme-atom";

export function InjectThemeAtom() {
  const theme = useMantineTheme();
  themeAtom.update(theme);
  return null;
}
