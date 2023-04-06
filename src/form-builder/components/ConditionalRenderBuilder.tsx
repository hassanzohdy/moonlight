import { get } from "@mongez/reinforcements";
import { ConditionalInputRenderer } from "./ConditionalInputRenderer";
import { InputBuilder } from "./InputBuilder";

export class ConditionalRenderBuilder extends InputBuilder {
  /**
   * Condition input name
   */
  private conditionInput = "";

  /**
   * Condition input value
   */
  private conditionValue: any = null;

  /**
   * Inputs that will be rendered when condition is met
   */
  private conditionInputs: InputBuilder[] = [];

  /**
   * Is matched condition state
   */
  public isMatched = false;

  /**
   * Matching callback
   */
  private matchingCallback: (isMatched: boolean) => void = () => {
    // do nothing
  };

  /**
   * Add the conditional matching callback
   */
  public listenForConditionalMatch(callback: (isMatched: boolean) => void) {
    this.matchingCallback = callback;
    return this;
  }

  /**
   * Set condition
   */
  public setCondition(input: string, value: any, inputs: InputBuilder[]) {
    this.conditionInput = input;
    this.conditionValue = value;
    this.conditionInputs = inputs;
    return this;
  }

  /**
   * Set record
   */
  public setRecord(record: any) {
    const inputValue = get(record, this.conditionInput);

    this.isMatched = inputValue === this.conditionValue;

    this.conditionInputs.forEach(input => {
      input.setRecord(record);
    });

    return super.setRecord(record);
  }

  /**
   * {@inheritdoc}
   */
  protected boot(): void {
    let isSubscribed = false;
    this.onRendered(() => {
      if (!this.form.form || isSubscribed) return;

      const input = this.form.form.control(this.conditionInput);

      if (!input) return;

      input.onChange(({ value, checked }) => {
        const isMatched =
          typeof this.conditionValue === "boolean"
            ? this.conditionValue === checked
            : value === this.conditionValue;

        this.isMatched = isMatched;

        this.matchingCallback(isMatched);
      });

      isSubscribed = true;
    });
  }

  /**
   * Render content
   */
  protected renderContent() {
    const { props } = this.prepareRendering();

    // we'll use custom key to force re-render the input if the record data has been changed
    // @see setRecord method

    return (
      <ConditionalInputRenderer
        conditionalInputsRenderer={this}
        key={this._key}
        inputsProps={props}
        inputs={this.conditionInputs}
      />
    );
  }
}
