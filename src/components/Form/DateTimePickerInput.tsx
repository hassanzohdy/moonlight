import { DateTimePicker } from "@mantine/dates";
import { DatePickerInput, DatePickerInputProps } from "./_DatePickerInput";

export const DateTimePickerInput = (props: DatePickerInputProps) => (
  <DatePickerInput component={DateTimePicker} {...props} />
);
