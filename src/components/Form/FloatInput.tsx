import {
  floatRule,
  FormControlProps,
  maxRule,
  minRule,
  requiredRule,
} from "@mongez/react-form";
import { NumberInput } from "./NumberInput";

export function FloatInput(props: FormControlProps) {
  return <NumberInput {...props} />;
}

FloatInput.defaultProps = {
  type: "float",
  precision: 2,
  rules: [requiredRule, minRule, maxRule, floatRule],
};
