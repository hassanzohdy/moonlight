import {
  floatRule,
  FormInputProps,
  maxRule,
  minRule,
  requiredRule,
} from "@mongez/react-form";
import { NumberInput } from "./NumberInput";

export function FloatInput(props: FormInputProps) {
  return <NumberInput {...props} />;
}

FloatInput.defaultProps = {
  type: "float",
  precision: 2,
  rules: [requiredRule, minRule, maxRule, floatRule],
};
