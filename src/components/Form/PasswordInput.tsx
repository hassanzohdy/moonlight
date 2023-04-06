import { PasswordInput as BasePasswordInput } from "@mantine/core";
import {
  lengthRule,
  matchRule,
  maxLengthRule,
  minLengthRule,
  requiredRule,
} from "@mongez/react-form";
import { BaseInput, BaseInputProps } from "./BaseInput";

export function PasswordInput(props: BaseInputProps) {
  return <BaseInput {...props} />;
}

PasswordInput.defaultProps = {
  type: "password",
  component: BasePasswordInput,
  rules: [requiredRule, minLengthRule, lengthRule, maxLengthRule, matchRule],
};
