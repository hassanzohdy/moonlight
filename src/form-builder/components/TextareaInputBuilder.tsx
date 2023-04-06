import { TextAreaInput } from "../../components/Form";
import { InputBuilder } from "./InputBuilder";

export class TextareaInputBuilder extends InputBuilder {
  /**
   * {@inheritDoc}
   */
  public boot() {
    this.data.component = TextAreaInput;

    this.minRows(6);
  }

  /**
   * Set rows for textarea
   */
  public rows(rows: number) {
    this.componentProps.minRows = rows;
    this.componentProps.maxRows = rows;
    return this;
  }

  /**
   * Set min rows for textarea
   */
  public minRows(rows: number) {
    this.componentProps.minRows = rows;
    return this;
  }

  /**
   * Set max rows for textarea
   */
  public maxRows(rows: number) {
    this.componentProps.maxRows = rows;
    return this;
  }

  /**
   * Auto resize textarea
   */
  public autoResize(autoResize = true) {
    this.componentProps.autosize = autoResize;
    return this;
  }
}
