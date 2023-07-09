import { DatePicker as BaseDatePicker } from "@mantine/dates";
import { DatePickerInput, DatePickerInputProps } from "./_DatePickerInput";

export const DatePicker = (props: DatePickerInputProps) => (
  <DatePickerInput component={BaseDatePicker} {...props} />
);
