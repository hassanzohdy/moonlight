import { Checkbox, CheckboxProps } from "@mantine/core";
import { withCheckboxInput } from "./withCheckboxInput";

export const CheckboxInput =
  withCheckboxInput<Partial<CheckboxProps>>(Checkbox);
