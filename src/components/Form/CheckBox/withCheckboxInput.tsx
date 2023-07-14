import {
  FormControlChangeOptions,
  FormControlProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import React from "react";

const defaultOptions = {
  otherProps: (otherProps: any, _props: any) => otherProps,
  getStateChange: (e: any) => e.target.checked,
  inputColor: () => undefined,
  multiple: false,
};

export type CheckboxInputOptions = {
  otherProps?: (otherProps: any, props: any) => any;
  getStateChange?: (e: any) => any;
  inputColor?: (theme: any) => string;
  multiple?: boolean;
};

export function withCheckboxInput<T>(
  Component: React.FC<FormControlProps & T>,
  incomingOptions: CheckboxInputOptions = {},
) {
  type DefaultCheckboxProps = Omit<FormControlProps, "onChange" | "value"> & {
    onChange?: (checked: boolean, options?: FormControlChangeOptions) => any;
  };

  function CheckboxInput({
    multiple,
    collectUnchecked,
    uncheckedValue,
    ...props
  }: T & DefaultCheckboxProps) {
    const options = { ...defaultOptions, ...incomingOptions };

    const { checked, id, disabled, otherProps, visibleElementRef, setChecked } =
      useFormControl(props as FormControlProps, {
        uncheckedValue,
        collectUnchecked,
        multiple: multiple !== undefined ? multiple : options.multiple,
      });

    return (
      <span ref={visibleElementRef}>
        <Component
          styles={theme => ({
            label: {
              cursor: "pointer",
              color: options.inputColor(theme),
            },
            track: {
              cursor: "pointer",
            },
            input: {
              cursor: "pointer",
            },
          })}
          disabled={disabled}
          id={id}
          checked={checked}
          onChange={e => {
            setChecked(typeof e === "boolean" ? e : e.currentTarget.checked);
          }}
          {...options.otherProps(otherProps, props)}
        />
      </span>
    );
  }
  CheckboxInput.defaultProps = {
    rules: [requiredRule],
    defaultValue: true,
    type: "checkbox",
  };

  return React.memo(CheckboxInput);
}
