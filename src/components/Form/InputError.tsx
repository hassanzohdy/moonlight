import { Box, useMantineTheme } from "@mantine/core";
import { trans } from "@mongez/localization";
import { InputError as FormInputErrorProps } from "@mongez/react-form";

export type InputErrorProps = {
  error: FormInputErrorProps;
};

export function InputError({ error }: InputErrorProps) {
  const theme = useMantineTheme();
  if (error === null) return null;

  return (
    <>
      <Box pt={10} style={{ color: theme.colors.red[0], fontWeight: "bold" }}>
        <Box>{trans(error.errorMessage)}</Box>
      </Box>
    </>
  );
}
