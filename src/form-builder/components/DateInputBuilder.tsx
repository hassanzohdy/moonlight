import { DatePickerInput } from "../../components/Form/DatePickerInput";
import { InputBuilder } from "./InputBuilder";

export class DateInputBuilder extends InputBuilder {
  /**
   * {@inheritDoc}
   */
  public boot(): void {
    this.component(DatePickerInput);

    this.type("date");
  }

  /**
   * Set the minimum date input name to compare with.
   */
  public minDate(name: string) {
    this.componentProps.minDateInput = name;

    return this;
  }

  /**
   * Set the maximum date input name to compare with.
   */
  public maxDate(name: string) {
    this.componentProps.maxDateInput = name;

    return this;
  }
}
