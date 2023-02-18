import { FormInputProps } from "@mongez/react-form";
import { floatRule, maxRule, minRule, requiredRule } from "@mongez/validator";
import { NumberInput } from "./NumberInput";

export function FloatInput(props: FormInputProps) {
  return <NumberInput {...props} />;
}

FloatInput.defaultProps = {
  type: "float",
  precision: 2,
  rules: [requiredRule, minRule, maxRule, floatRule],
};
