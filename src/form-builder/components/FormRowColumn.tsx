import { Col } from "@mantine/core";
import React, { useMemo } from "react";
import { ColumnSize, FormButton, InputBuilder } from ".";
import { ShouldBeRendered } from "./ShouldBeRendered";

export class FormRowColumn extends ShouldBeRendered {
  /**
   * Column component
   */
  protected component: React.ComponentType<any> = Col;

  /**
   * Component props
   */
  protected componentProps: any = {};

  /**
   * Component content
   */
  protected content!: React.ReactNode | InputBuilder | FormButton;

  /**
   * Set column content
   */
  public setContent(content: React.ReactNode | InputBuilder | FormButton) {
    this.content = content;

    return this;
  }
  /**
   * Set input size
   */
  public size(size: ColumnSize) {
    if (typeof size === "object") {
      for (const key in size) {
        this.componentProps[key] = size[key];
      }
    } else {
      this.componentProps.size = size;
    }

    return this;
  }

  /**
   * Render
   */
  public render() {
    const Component = this.asComponent();

    return <Component />;
  }

  /**
   * Get column as component
   */
  public asComponent() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const column = this;
    const Wrapper = this.component;

    function FormRowColumn() {
      const content = useMemo(() => {
        const content = column.content;

        if (
          column.content instanceof InputBuilder ||
          column.content instanceof FormButton
        ) {
          return column.render();
        }

        return content;
      }, []);

      return (
        <>
          <Wrapper>{content}</Wrapper>
        </>
      );
    }

    FormRowColumn.displayName = "FormRowColumn";

    return React.memo(FormRowColumn);
  }
}
