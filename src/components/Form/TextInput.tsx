import {
  lengthRule,
  maxLengthRule,
  maxRule,
  minLengthRule,
  minRule,
  patternRule,
  requiredRule,
} from "@mongez/react-form";
import { BaseInput, BaseInputProps } from "./BaseInput";

export function TextInput(props: BaseInputProps) {
  return <BaseInput {...props} />;
}

TextInput.defaultProps = {
  type: "text",
  rules: [
    requiredRule,
    minLengthRule,
    maxLengthRule,
    lengthRule,
    minRule,
    maxRule,
    patternRule,
  ],
};

TextInput.displayName = "TextInput";
