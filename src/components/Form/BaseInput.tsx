import { Input, Loader, useMantineTheme } from "@mantine/core";
import { trans } from "@mongez/localization";
import { FormInputProps, useFormControl } from "@mongez/react-form";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";
import { left, right } from "../../utils/directions";
import { currentDirection } from "../../utils/helpers";
import { Tooltip } from "../Tooltip";
import { InputWrapper } from "./InputWrapper";

export type BaseInputProps = FormInputProps & {
  description?: React.ReactNode;
};

function _BaseInput({
  dir,
  component: Component = Input,
  loading,
  description,
  placeholder,
  ...props
}: BaseInputProps) {
  const { value, changeValue, inputRef, error, id, otherProps, ...rest } =
    useFormControl(props);

  let rightSection: React.ReactNode = null;

  const theme = useMantineTheme();

  if (error) {
    rightSection = (
      <Tooltip label={trans(error.errorMessage)} position="top-end" withArrow>
        <div>
          <IconAlertCircle
            size={18}
            style={{
              color: theme.colors.red[8],
              display: "block",
              opacity: 0.9,
            }}
          />
        </div>
      </Tooltip>
    );
  } else if (loading) {
    rightSection = <Loader size={18} color="gray" />;
  }

  return (
    <>
      <InputWrapper
        dir={dir}
        id={id}
        description={description}
        {...rest}
        error={error}
      >
        <Component
          invalid={Boolean(error)}
          ref={inputRef}
          id={id}
          readOnly={loading}
          rightSection={rightSection}
          styles={() => ({
            input: {
              textAlign: currentDirection() === "ltr" ? left(dir) : right(dir),
            },
          })}
          placeholder={
            placeholder && trans(placeholder) + (props.required ? " *" : "")
          }
          onChange={changeValue}
          value={value}
          {...otherProps}
        />
      </InputWrapper>
    </>
  );
}

export const BaseInput = React.memo(_BaseInput);
