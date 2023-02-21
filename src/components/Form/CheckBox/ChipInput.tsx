import { Chip, ChipProps } from "@mantine/core";
import { withCheckboxInput } from "./withCheckboxInput";

export const ChipInput = withCheckboxInput<Partial<ChipProps>>(Chip as any, {
  otherProps: (otherProps, props) => ({
    children: props.label,
    ...otherProps,
  }),
  getStateChange: (e) => e,
});

ChipInput.displayName = "ChipInput";
