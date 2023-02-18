import { Box } from "@mantine/core";
import { Check, X } from "tabler-icons-react";

export type BooleanValueProps = {
  value: boolean;
  trueColor?: string;
  falseColor?: string;
};

export function BooleanValue({
  value,
  trueColor = "#00b341",
  falseColor = "#fd0061",
}: BooleanValueProps) {
  if (value === true) {
    return (
      <Box>
        <Check color={trueColor} />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <X color={falseColor} />
      </Box>
    </>
  );
}
