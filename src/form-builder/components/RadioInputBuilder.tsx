import { MantineColor } from "@mantine/core";
import { InputBuilder } from "./InputBuilder";

export class RadioInputBuilder extends InputBuilder {
  /**
   * Set color
   */
  public color(color: MantineColor) {
    this.componentProps.color = color;
    return this;
  }

  /**
   * Set value
   */
  public value(value: any) {
    this.componentProps.value = value;
    return this;
  }

  /**
   * Label position
   */
  public labelPosition(position: "left" | "right") {
    this.componentProps.labelPosition = position;
    return this;
  }
}
