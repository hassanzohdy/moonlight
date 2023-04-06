import { Col, Flex } from "@mantine/core";
import React from "react";
import { RadioGroupInput } from "./../../components/Form/";
import { InputBuilder } from "./InputBuilder";
import { RadioInputBuilder } from "./RadioInputBuilder";

export class RadioGroupInputBuilder extends InputBuilder {
  /**
   * Radio inputs list
   */
  protected inputs: RadioInputBuilder[] = [];

  /**
   * Determine if inputs should be displayed vertically
   */
  protected isVertical = false;

  /**
   * Set radio inputs list
   */
  setInputs(inputs: RadioInputBuilder[]) {
    this.inputs = inputs;
    return this;
  }

  /**
   * Set vertical property
   */
  public vertical(isVertical = true) {
    this.isVertical = isVertical;

    return this;
  }

  /**
   * {@inheritDoc}
   */
  public renderContent() {
    const { props } = this.prepareRendering();

    const inputWrapper = this.isVertical ? Col : React.Fragment;

    const Wrapper = this.isVertical === false ? Flex : React.Fragment;

    const wrapperProps =
      this.isVertical === false ? { my: "sm", gap: "sm" } : {};

    const inputsList = this.inputs.map(input =>
      input.setRecord(this.record).setWrapper(inputWrapper).render(),
    );

    return (
      <>
        <Col {...this.getWrapperProps()}>
          <RadioGroupInput {...props}>
            <Wrapper {...wrapperProps}>{inputsList}</Wrapper>
          </RadioGroupInput>
        </Col>
      </>
    );
  }
}
