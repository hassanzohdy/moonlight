import { Divider, DividerProps } from "@mantine/core";
import { InputBuilder } from "./InputBuilder";

export class DividerBuilder extends InputBuilder {
  /**
   * {@inheritDoc}
   */
  public constructor() {
    super("");

    this.boot();

    this.col(12);
  }

  /**
   * {@inheritDoc}
   */
  public boot() {
    this.data.component = Divider;
    this.componentProps.variant = "solid";
  }

  /**
   * Label Position
   */
  public labelPosition(labelPosition: DividerProps["labelPosition"]) {
    this.componentProps.labelPosition = labelPosition;

    return this;
  }

  /**
   * Set `my` prop value
   */
  public spacing(spacing: DividerProps["my"]) {
    this.componentProps.my = spacing;

    return this;
  }

  /**
   * Divider Style
   */
  public style(variant: DividerProps["variant"]) {
    this.componentProps.variant = variant;

    return this;
  }
}
