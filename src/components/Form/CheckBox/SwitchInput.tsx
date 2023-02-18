import { Switch, SwitchProps } from "@mantine/core";
import { withCheckboxInput } from "./withCheckboxInput";

export const SwitchInput = withCheckboxInput<Partial<SwitchProps>>(Switch, {});
