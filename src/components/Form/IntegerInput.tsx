import {
  integerRule,
  maxRule,
  minRule,
  requiredRule,
} from "@mongez/react-form";
import { BaseInputProps } from "./BaseInput";
import { NumberInput } from "./NumberInput";

export function IntegerInput(props: BaseInputProps) {
  return <NumberInput {...props} />;
}

IntegerInput.defaultProps = {
  type: "integer",
  rules: [requiredRule, minRule, maxRule, integerRule],
};
