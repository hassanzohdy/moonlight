import { Radio, RadioGroupProps } from "@mantine/core";
import {
  FormControlProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import React from "react";

export type RadioGroupInputProps = RadioGroupProps & FormControlProps;

function _RadioGroupInput(props: RadioGroupInputProps, ref: any) {
  const { value, error, changeValue, visibleElementRef, otherProps } =
    useFormControl(props);

  return (
    <Radio.Group
      value={value}
      error={error}
      onChange={changeValue}
      required={props.required}
      withAsterisk={props.required}
      {...otherProps}
      ref={groupRef => {
        if (ref) {
          ref.current = groupRef;
          visibleElementRef.current = groupRef;
        }
      }}
    />
  );
}

export const RadioGroupInput = React.forwardRef(_RadioGroupInput);

RadioGroupInput.defaultProps = {
  rules: [requiredRule],
};
