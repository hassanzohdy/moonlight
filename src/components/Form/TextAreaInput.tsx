import { Textarea } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useFormInput } from "@mongez/react-form";
import { requiredRule } from "@mongez/validator";
import React from "react";
import { left } from "../../utils/directions";
import { BaseInputProps } from "./BaseInput";
import { InputWrapper } from "./InputWrapper";

function _TextAreaInput(
  { dir, description, ...props }: BaseInputProps,
  ref: any,
) {
  const {
    name,
    id,
    value,
    label,
    visibleElementRef,
    placeholder,
    required,
    onChange,
    onBlur,
    error,
    otherProps,
  } = useFormInput(props);

  return (
    <>
      <InputWrapper
        visibleElementRef={visibleElementRef}
        error={error}
        id={id}
        label={label}
        dir={dir}
        description={description}
        required={required}>
        <Textarea
          id={id}
          ref={ref}
          name={name}
          styles={() => ({
            input: {
              textAlign: left(dir),
            },
          })}
          required={required}
          placeholder={trans(placeholder as string)}
          onChange={onChange}
          onBlur={onBlur as any}
          value={value}
          {...otherProps}
        />
      </InputWrapper>
    </>
  );
}

export const TextAreaInput: React.FC<BaseInputProps> =
  React.forwardRef(_TextAreaInput);

TextAreaInput.defaultProps = {
  rules: [requiredRule],
  autosize: true,
};
