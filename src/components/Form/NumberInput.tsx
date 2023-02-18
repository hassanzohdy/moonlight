import { NumberInput as BaseNumberInput } from "@mantine/core";
import { maxRule, minRule, numberRule, requiredRule } from "@mongez/validator";
import { BaseInput, BaseInputProps } from "./BaseInput";

export function NumberInput(props: BaseInputProps) {
  return <BaseInput {...props} />;
}

NumberInput.defaultProps = {
  type: "number",
  rule: "number",
  rules: [requiredRule, numberRule, minRule, maxRule],
  component: BaseNumberInput,
  onChangeInput: value => {
    if (value.target) return value;

    return {
      target: {
        value,
      },
    };
  },
};
