import { DatePicker as BaseDatePicker } from "@mantine/dates";
import { DatePickerInput, DatePickerInputProps } from "./DatePickerInput;

export const DatePicker = (props: DatePickerInputProps) => (
  <DatePickerInput component={BaseDatePicker} {...props} />
);
