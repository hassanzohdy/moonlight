import { Grid, Tabs } from "@mantine/core";
import { trans } from "@mongez/localization";
import { Random } from "@mongez/reinforcements";
import React from "react";
import { ShouldTabBeRendered } from "../types";
import { InputBuilder } from "./InputBuilder";
import { ReactiveForm } from "./ReactiveForm";

export class FormTab {
  /**
   * Tab inputs
   */
  protected inputsList: InputBuilder[] = [];

  /**
   * Tab id
   */
  public id = "frmBldTab" + Random.string(16);

  /**
   * Reactive form instance
   */
  public form!: ReactiveForm;

  /**
   * Tab icon
   */
  protected tabIcon?: React.ReactNode;

  /**
   * record
   */
  protected formRecord: any = {};

  /**
   * Determine if the tab should be rendered or not
   */
  public shouldBeRendered: ShouldTabBeRendered = true;

  /**
   * Constructor
   */
  public constructor(
    protected tabName: string,
    protected label: React.ReactNode = trans(tabName),
  ) {
    //
  }

  /**
   * Set reactive form
   */
  public setForm(form: ReactiveForm) {
    this.form = form;
    return this;
  }

  /**
   * Set tab label
   */
  public setLabel(label: React.ReactNode) {
    this.label = label;
    return this;
  }

  /**
   * Determine whether the tab should be rendered or not
   */
  public enable(shouldBeRendered: ShouldTabBeRendered) {
    this.shouldBeRendered = shouldBeRendered;
    return this;
  }

  /**
   * Get tab name
   */
  public name() {
    return this.tabName;
  }

  /**
   * Set form record
   */
  public setRecord(record: any) {
    this.formRecord = record;
    return this;
  }

  /**
   * Set inputs
   */
  public setInputs(inputs: InputBuilder[]) {
    this.inputsList = inputs;

    this.inputsList.forEach(input => input.setTab(this));

    return this;
  }

  /**
   * Add inputs
   */
  public addInputs(...inputs: InputBuilder[]) {
    this.inputsList = [...this.inputsList, ...inputs];
    return this;
  }

  /**
   * Get inputs
   */
  public inputs() {
    return this.inputsList;
  }

  /**
   * Set tab icon
   */
  public icon(icon: React.ReactNode) {
    this.tabIcon = icon;
    return this;
  }

  /**
   * Trigger tab is rendered
   */
  public rendered() {
    this.inputsList.forEach(input => input.rendered());
  }

  /**
   * Render tab heading
   */
  public renderHeading() {
    return (
      <Tabs.Tab icon={this.tabIcon} key={this.tabName} value={this.tabName}>
        {this.label}
      </Tabs.Tab>
    );
  }

  /**
   * Render tab content
   */
  public renderContent() {
    return (
      <Tabs.Panel p="xs" key={this.tabName} value={this.tabName}>
        <Grid>
          {this.inputsList.map((input, index) => (
            <React.Fragment key={input.name() + index}>
              {input.setRecord(this.formRecord).render()}
            </React.Fragment>
          ))}
        </Grid>
      </Tabs.Panel>
    );
  }
}

export function formTab(tabName: string, tabLabel?: React.ReactNode) {
  return new FormTab(tabName, tabLabel);
}
