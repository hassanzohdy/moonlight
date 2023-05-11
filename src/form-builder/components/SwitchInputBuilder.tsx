import { InputBuilder } from "./InputBuilder";

export class SwitchInputBuilder extends InputBuilder {
  /**
   * Make it centered
   */
  public centered() {
    this.setComponentProps({
      mt: 40,
    });

    return this;
  }
}
