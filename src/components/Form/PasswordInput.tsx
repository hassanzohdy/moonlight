import { PasswordInput as BasePasswordInput } from "@mantine/core";
import { useFormInput } from "@mongez/react-form";
import {
  lengthRule,
  matchElementRule,
  maxLengthRule,
  minLengthRule,
  requiredRule,
} from "@mongez/validator";
import { left, right } from "../../utils/directions";
import { currentDirection } from "../../utils/helpers";
import { BaseInputProps } from "./BaseInput";
import { InputWrapper } from "./InputWrapper";

export function PasswordInput({ description, dir, ...props }: BaseInputProps) {
  const {
    name,
    id,
    value,
    onChange,
    onBlur,
    error,
    inputRef,
    otherProps,
    placeholder,
    ...rest
  } = useFormInput(props);

  delete otherProps.matchElement;
  delete otherProps.matchText;

  return (
    <>
      <div className="form-control"></div>
      <InputWrapper
        dir={dir}
        id={id}
        description={description}
        {...rest}
        error={error}
      >
        <BasePasswordInput
          error={error !== null}
          name={name}
          ref={inputRef}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...otherProps}
          placeholder={placeholder + (props.required ? " *" : "")}
          styles={() => ({
            input: {
              textAlign: currentDirection() === "ltr" ? left(dir) : right(dir),
            },
          })}
          {...otherProps}
        />
      </InputWrapper>
    </>
  );
}

PasswordInput.defaultProps = {
  type: "password",
  rules: [
    requiredRule,
    minLengthRule,
    lengthRule,
    maxLengthRule,
    matchElementRule,
  ],
};
