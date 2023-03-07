import { PasswordInput as BasePasswordInput } from "@mantine/core";
import { trans } from "@mongez/localization";
import {
  lengthRule,
  matchElementRule,
  maxLengthRule,
  minLengthRule,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import { left, right } from "../../utils/directions";
import { currentDirection } from "../../utils/helpers";
import { BaseInputProps } from "./BaseInput";
import { InputWrapper } from "./InputWrapper";

export function PasswordInput({
  description,
  placeholder,
  dir,
  ...props
}: BaseInputProps) {
  const { id, value, changeValue, error, inputRef, otherProps, ...rest } =
    useFormControl(props);

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
          error={Boolean(error)}
          ref={inputRef}
          id={id}
          onChange={(e) => changeValue(e.currentTarget.value)}
          value={value}
          {...otherProps}
          placeholder={
            placeholder ? trans(placeholder) + (props.required && " *") : ""
          }
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
