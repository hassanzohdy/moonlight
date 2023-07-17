import { PinInput as BasePinInput } from "@mantine/core";
import { maxRule, minRule, numberRule, requiredRule } from "@mongez/react-form";
import { BaseInput, BaseInputProps } from "./BaseInput";

export function PinInput(props: BaseInputProps) {
  return <BaseInput {...props} handleValueChange={e => e} />;
}

PinInput.defaultProps = {
  type: "number",
  rule: "number",
  rules: [requiredRule, numberRule, minRule, maxRule],
  component: BasePinInput,
};
