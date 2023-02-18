import { InputBuilder } from "./InputBuilder";

export class CustomInputBuilder extends InputBuilder {
  /**
   * {@inheritDoc}
   */
  protected prepareRendering() {
    const { props, Component, wrapperProps } = super.prepareRendering();

    return {
      props: {
        ...props,
        record: this.record,
      },
      Component,
      wrapperProps,
    };
  }
}
