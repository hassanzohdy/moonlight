import { Radio, RadioProps } from "@mantine/core";
import {
  FormControlProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import React from "react";

export type RadioInputProps = RadioProps & FormControlProps;

function _RadioInput(props: RadioInputProps, ref: any) {
  const {
    id,
    value,
    checked,
    name,
    error,
    visibleElementRef,
    setChecked,
    otherProps,
  } = useFormControl(props, {
    isCollectable({ checked }) {
      return checked;
    },
  });

  return (
    <Radio
      id={id}
      value={value}
      name={name}
      error={error}
      checked={checked}
      styles={{
        label: {
          cursor: "pointer",
        },
        radio: {
          cursor: "pointer",
        },
      }}
      onChange={event => {
        setChecked(event.currentTarget.checked);
      }}
      ref={inputRef => {
        if (ref) {
          ref.current = inputRef;
        }
        visibleElementRef.current = inputRef;
      }}
      {...otherProps}
    />
  );
}

export const RadioInput = React.forwardRef(_RadioInput);

RadioInput.defaultProps = {
  type: "radio",
  rules: [requiredRule],
};
