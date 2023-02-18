import { TextAreaInput } from "../../components/Form";
import { InputBuilder } from "./InputBuilder";

export class TextareaInputBuilder extends InputBuilder {
  /**
   * {@inheritDoc}
   */
  public boot() {
    this.data.component = TextAreaInput;
  }

  /**
   * Determine whether to display the confirm password input
   */
  public rows(rows: number) {
    this.componentProps.rows = rows;
    return this;
  }
}
