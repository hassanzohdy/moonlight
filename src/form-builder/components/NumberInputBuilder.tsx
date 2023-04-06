import { InputBuilder } from "./InputBuilder";

export class NumberInputBuilder extends InputBuilder {
  /**
   * Set min value
   */
  public min(min: number) {
    this.componentProps.min = min;
    return this;
  }

  /**
   * Set max value
   */
  public max(max: number) {
    this.componentProps.max = max;
    return this;
  }

  /**
   * Set precision value
   */
  public precision(precision: number) {
    this.componentProps.precision = precision;
    return this;
  }

  /**
   * Set step value
   */
  public step(step: number) {
    this.componentProps.step = step;
    return this;
  }

  /**
   * {@inheritDoc}
   */
  public boot(): void {
    this.type("number").min(0);
  }
}
