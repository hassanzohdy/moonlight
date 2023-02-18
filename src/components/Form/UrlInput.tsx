import { requiredRule, urlRule } from "@mongez/validator";
import { BaseInput, BaseInputProps } from "./BaseInput";

export function UrlInput(props: BaseInputProps) {
  return <BaseInput {...props} />;
}

UrlInput.defaultProps = {
  type: "url",
  rules: [requiredRule, urlRule],
};
