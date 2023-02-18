import { FormInputProps, HiddenInput, useFormInput } from "@mongez/react-form";
import { useEvent } from "@mongez/react-hooks";
import { requiredRule } from "@mongez/validator";
import React, { useEffect } from "react";
import { useControlled } from "./../../../hooks";

const defaultOptions = {
  otherProps: (otherProps: any, _props: any) => otherProps,
  getStateChange: (e: any) => e.target.checked,
  inputColor: () => undefined,
};

export function withCheckboxInput<T>(
  Component: React.FC<FormInputProps & T>,
  incomingOptions: any = {},
) {
  function CheckboxInput(props: FormInputProps & T) {
    const [checked, setEnabled, initialState, isControlled] = useControlled(
      props,
      "checked",
      false,
    );

    const [uncheckedValue] = useControlled(props, "uncheckedValue", "");

    const options = { ...defaultOptions, ...incomingOptions };

    const {
      value,
      label,
      name,
      readOnly,
      id,
      disabled,
      otherProps,
      visibleElementRef,
      formInput,
      setChecked,
      onChange,
    } = useFormInput(props);

    useEvent(() => formInput.on("reset", () => setEnabled(initialState)));

    const updateChangeState = (e: any) => {
      if (isControlled) {
        onChange(e, formInput);
        return;
      }

      const newState = options.getStateChange(e);

      setEnabled(newState);

      onChange(e, formInput);
    };

    useEffect(() => {
      setChecked?.(checked);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    useEffect(() => {
      const onReset = formInput.on("reset", () => {
        setEnabled(initialState);
      });

      return () => onReset.unsubscribe();
    }, [formInput, initialState, setEnabled]);

    const rest = options.otherProps(otherProps, props);

    delete rest.defaultChecked;
    delete rest.checked;

    return (
      <span ref={visibleElementRef}>
        {checked && <HiddenInput name={name} value={value} />}
        {!checked && uncheckedValue !== undefined && (
          <HiddenInput name={name} value={uncheckedValue} />
        )}
        <Component
          styles={theme => ({
            label: {
              cursor: "pointer",
              color: options.inputColor(theme),
            },
            input: {
              cursor: "pointer",
            },
          })}
          disabled={disabled}
          readOnly={readOnly}
          label={label}
          id={id}
          value={value}
          checked={checked}
          onChange={updateChangeState}
          {...rest}
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
