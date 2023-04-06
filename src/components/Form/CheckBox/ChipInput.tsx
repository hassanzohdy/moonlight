import { Chip, ChipProps } from "@mantine/core";
import { withCheckboxInput } from "./withCheckboxInput";

export const ChipInput = withCheckboxInput<Partial<ChipProps>>(Chip as any, {
  multiple: true,
  otherProps: (otherProps, props) => ({
    children: props.label,
    ...otherProps,
  }),
});

ChipInput.displayName = "ChipInput";
