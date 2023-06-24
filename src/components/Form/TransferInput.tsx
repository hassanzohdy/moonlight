import { TransferList as BaseTransferList } from "@mantine/core";
import { trans } from "@mongez/localization";
import { requiredRule, useFormControl } from "@mongez/react-form";
import React from "react";
import { currentDirection } from "../../utils";
import { left, right } from "../../utils/directions";
import { BaseInputProps } from "./BaseInput";
import { InputWrapper } from "./InputWrapper";

function _TransferInput(
  { dir, label, required, placeholder, description, ...props }: BaseInputProps,
  ref: any,
) {
  const {
    id,
    value,
    visibleElementRef,
    // changeValue,
    disabled,
    error,
    otherProps,
  } = useFormControl({
    ...props,
    required,
  });

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
        <BaseTransferList
          id={id}
          disabled={disabled}
          ref={ref}
          styles={() => ({
            input: {
              // this is needed to make the input aligned based on the given direction
              textAlign: currentDirection() === "ltr" ? left(dir) : right(dir),
            },
          })}
          required={required}
          placeholder={
            placeholder ? trans(placeholder) + (required ? " *" : "") : ""
          }
          // onChange={e => changeValue(e.target.value)}
          value={value}
          {...otherProps}
        />
      </InputWrapper>
    </>
  );
}

export const TransferInput: React.FC<BaseInputProps> = React.memo(
  React.forwardRef(_TransferInput),
);

TransferInput.defaultProps = {
  rules: [requiredRule],
};
