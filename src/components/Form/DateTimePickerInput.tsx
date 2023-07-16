import { DateTimePicker } from "@mantine/dates";
import { DatePickerInput, DatePickerInputProps } from "./DatePickerInput;

export const DateTimePickerInput = (props: DatePickerInputProps) => (
  <DatePickerInput component={DateTimePicker} {...props} />
);
