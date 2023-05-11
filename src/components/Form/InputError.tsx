import { Box, useMantineTheme } from "@mantine/core";

export type InputErrorProps = {
  error: any;
};

export function InputError({ error }: InputErrorProps) {
  const theme = useMantineTheme();
  if (!error) return null;

  return (
    <>
      <Box pt={10} style={{ color: theme.colors.red[0], fontWeight: "bold" }}>
        <Box>{error}</Box>
      </Box>
    </>
  );
}
