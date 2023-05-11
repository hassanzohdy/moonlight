import { DatePicker, DateTimePickerInput } from "../../components";
import { DateInputBuilder } from "../components";

export function dateInput(name: string) {
  return new DateInputBuilder(name);
}

export function dateTimeInput(name: string) {
  return new DateInputBuilder(name).component(DateTimePickerInput);
}

export function datePicker(name: string) {
  return new DateInputBuilder(name).component(DatePicker);
}
