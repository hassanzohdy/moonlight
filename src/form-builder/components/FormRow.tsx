import { Flex, Grid, Group, SimpleGrid } from "@mantine/core";
import React, { useMemo } from "react";
import { FormRowColumn } from "./FormRowColumn";
import { ShouldBeRendered } from "./ShouldBeRendered";

export class FormRow extends ShouldBeRendered {
  /**
   * row columns
   */
  public columns: FormRowColumn[] = [];

  /**
   * Wrapper Component
   */
  protected wrapperComponent: React.ComponentType<any> = Flex;

  /**
   * Component props
   */
  protected componentProps: any = {};

  /**
   * Set row columns
   */
  public setColumns(columns: FormRowColumn[]) {
    this.columns = columns;

    return this;
  }

  /**
   * Set wrapper type
   */
  public setWrapperComponent(component: React.ComponentType<any>) {
    this.wrapperComponent = component;

    return this;
  }

  /**
   * Center row
   */
  public centered() {
    this.componentProps["justifyContent"] = "center";

    return this;
  }

  /**
   * Make row as grid
   */
  public asGrid() {
    this.wrapperComponent = Grid;
  }

  /**
   * Make row as flex
   */
  public asFlex() {
    this.wrapperComponent = Flex;

    return this;
  }

  /**
   * Make row as group
   */
  public asGroup() {
    this.wrapperComponent = Group;

    return this;
  }

  /**
   * Margin top
   */
  public mt(value: number) {
    this.componentProps["mt"] = value;

    return this;
  }

  /**
   * Make row as equal columns
   */
  public asEqualColumns() {
    this.wrapperComponent = SimpleGrid;

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
   * Render
   */
  public asComponent() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const row = this;
    const Wrapper = row.wrapperComponent;

    function FormRow() {
      const columns = useMemo(() => {
        return row.columns.map((column, index) => (
          <React.Fragment key={index}>{column.render()}</React.Fragment>
        ));
      }, []);

      return (
        <>
          <Wrapper>{columns}</Wrapper>
        </>
      );
    }

    FormRow.displayName = "FormRow";

    return React.memo(FormRow);
  }
}
