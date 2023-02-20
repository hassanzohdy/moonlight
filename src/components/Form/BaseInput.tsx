import { Input, Loader, useMantineTheme } from "@mantine/core";
import { trans } from "@mongez/localization";
import { FormInputProps, useFormInput } from "@mongez/react-form";
import { IconAlertCircle } from "@tabler/icons";
import React, { useEffect } from "react";
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
  onChangeInput = (e) => e,
  ...props
}: BaseInputProps) {
  const {
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    inputRef,
    autoFocus,
    error,
    id,
    formInput,
    otherProps,
    ...rest
  } = useFormInput(props);

  let rightSection: React.ReactNode = null;

  const theme = useMantineTheme();

  useEffect(() => {
    const onReset = formInput.on("reset", () => {
      onChangeInput({ target: { value: undefined } });
    });

    return () => onReset.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formInput]);

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
          invalid={error !== null}
          name={name}
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
            placeholder &&
            trans(placeholder as string) + (props.required ? " *" : "")
          }
          onChange={(e) => onChange(onChangeInput(e))}
          onBlur={onBlur as any}
          value={value}
          autoFocus={autoFocus}
          {...otherProps}
        />
      </InputWrapper>
    </>
  );
}

export const BaseInput = React.memo(_BaseInput);
