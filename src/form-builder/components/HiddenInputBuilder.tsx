import { HiddenInput } from "@mongez/react-form";
import { InputBuilder } from "./InputBuilder";

export class HiddenInputBuilder extends InputBuilder {
  /**
   * Render content, this will be used to get the rendered content
   */
  protected renderContent() {
    const { props } = this.prepareRendering();

    return (
      <HiddenInput
        name={this.data.name}
        value={props.value || props.defaultValue}
      />
    );
  }
}
