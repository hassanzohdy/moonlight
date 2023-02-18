import { ButtonProps } from "@mantine/core";
import { trans } from "@mongez/localization";
import React from "react";
import { SubmitButton } from "../../components";
import { ReactiveForm } from "./ReactiveForm";

export class FormButton {
  /**
   * button props
   */
  protected props: ButtonProps = {
    size: "sm",
    color: "primary",
    children: trans("submit"),
    variant: "filled",
  };

  /**
   * Button component
   * Merge button props to be ButtonProps with html button props
   */
  protected buttonComponent: React.FC<ButtonProps> = SubmitButton;

  /**
   * Set button content
   */
  public content(content: React.ReactNode) {
    this.props.children = content;
    return this;
  }

  /**
   * Set button color
   */
  public color(color: ButtonProps["color"]) {
    this.props.color = color;
    return this;
  }

  /**
   * Set button variant
   */
  public variant(variant: ButtonProps["variant"]) {
    this.props.variant = variant;
    return this;
  }

  /**
   * Set button name
   */
  public name(name: string) {
    this.props["name"] = name;
    return this;
  }

  /**
   * Set button size
   */
  public size(size: ButtonProps["size"]) {
    this.props.size = size;
    return this;
  }

  /**
   * Set button type
   */
  public type(type: ButtonProps["type"]) {
    this.props.type = type;

    return this;
  }

  /**
   * Set button full width
   */
  public fullWidth(fullWidth = true) {
    this.props.w = fullWidth ? "100%" : undefined;

    return this;
  }

  /**
   * Get button name
   */
  public getName() {
    return this.props["name"];
  }

  /**
   * Add event when button is clicked
   */
  public onClick(
    callback: (reactiveForm: ReactiveForm, event: React.MouseEvent) => void,
  ) {
    this.props["onClick"] = callback;
    return this;
  }

  /**
   * Disable button
   */
  public disabled(disabled = true) {
    this.props.disabled = disabled;

    return this;
  }

  /**
   * Set button component
   */
  public component(component: React.FC<ButtonProps>) {
    this.buttonComponent = component;
  }

  /**
   * Render as component
   */
  public getComponent() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const formButton = this;

    function FormButton({ reactiveForm }: { reactiveForm: ReactiveForm }) {
      const Component = formButton.buttonComponent;
      const propsList: any = { ...formButton.props };

      if (propsList.onClick) {
        propsList.onClick = (event: React.MouseEvent) => {
          formButton.props["onClick"](reactiveForm, event);
        };
      }

      return <Component {...propsList} />;
    }

    FormButton.displayName = "FormButton" + this.getName();

    return FormButton;
  }
}
