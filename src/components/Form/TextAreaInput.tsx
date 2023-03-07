import { Textarea } from "@mantine/core";
import { trans } from "@mongez/localization";
import { requiredRule, useFormControl } from "@mongez/react-form";
import React from "react";
import { left } from "../../utils/directions";
import { BaseInputProps } from "./BaseInput";
import { InputWrapper } from "./InputWrapper";

function _TextAreaInput(
  { dir, label, required, placeholder, description, ...props }: BaseInputProps,
  ref: any
) {
  const { id, value, visibleElementRef, changeValue, error, otherProps } =
    useFormControl(props);

  return (
    <>
      <InputWrapper
        visibleElementRef={visibleElementRef}
        error={error}
        id={id}
        label={label}
        dir={dir}
        description={description}
        required={required}
      >
        <Textarea
          id={id}
          ref={ref}
          styles={() => ({
            input: {
              textAlign: left(dir),
            },
          })}
          required={required}
          placeholder={placeholder && trans(placeholder) + (required && " *")}
          onChange={(e) => changeValue(e.currentTarget.value)}
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
