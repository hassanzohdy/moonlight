import { NumberInput as BaseNumberInput } from "@mantine/core";
import { maxRule, minRule, numberRule, requiredRule } from "@mongez/react-form";
import { BaseInput, BaseInputProps } from "./BaseInput";

export function NumberInput(props: BaseInputProps) {
  return <BaseInput {...props} handleValueChange={e => e} />;
}

NumberInput.defaultProps = {
  type: "number",
  rule: "number",
  rules: [requiredRule, numberRule, minRule, maxRule],
  component: BaseNumberInput,
};
