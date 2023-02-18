import { Box } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

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
        <IconCheck color={trueColor} />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <IconX color={falseColor} />
      </Box>
    </>
  );
}
