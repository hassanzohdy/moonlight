import {
  FormInputProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import React from "react";

const defaultOptions = {
  otherProps: (otherProps: any, _props: any) => otherProps,
  getStateChange: (e: any) => e.target.checked,
  inputColor: () => undefined,
};

export function withCheckboxInput<T>(
  Component: React.FC<FormInputProps & T>,
  incomingOptions: any = {}
) {
  function CheckboxInput(props: FormInputProps & T) {
    const options = { ...defaultOptions, ...incomingOptions };

    const { checked, id, disabled, otherProps, visibleElementRef, setChecked } =
      useFormControl(props);

    return (
      <span ref={visibleElementRef}>
        <Component
          styles={(theme) => ({
            label: {
              cursor: "pointer",
              color: options.inputColor(theme),
            },
            input: {
              cursor: "pointer",
            },
          })}
          disabled={disabled}
          id={id}
          checked={checked}
          onChange={(e) => setChecked(e.currentTarget.checked)}
          {...options.otherProps(otherProps, props)}
        />
      </span>
    );
  }
  CheckboxInput.defaultProps = {
    rules: [requiredRule],
    defaultValue: 1,
    type: "checkbox",
  };

  return CheckboxInput as React.FC<FormInputProps & T>;
}
