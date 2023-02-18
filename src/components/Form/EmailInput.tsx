import { emailRule, requiredRule } from "@mongez/validator";
import { BaseInput, BaseInputProps } from "./BaseInput";

export function EmailInput(props: BaseInputProps) {
  return <BaseInput {...props} />;
}

EmailInput.defaultProps = {
  type: "email",
  rules: [requiredRule, emailRule],
};
