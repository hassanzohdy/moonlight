import { ChipProps } from "@mantine/core";
import { RestfulEndpoint } from "@mongez/http";
import { get } from "@mongez/reinforcements";
import { getLocalizedValue } from "../../utils/localization";
import { ChipsInputRenderer } from "./ChipsInputRenderer";
import { InputBuilder } from "./InputBuilder";

export class ChipsInputBuilder extends InputBuilder {
  /**
   * Service class
   */
  public _service?: RestfulEndpoint;

  /**
   * Options list, used if the request is not set
   */
  public optionsList: any[] | undefined = undefined;

  /**
   * Reset Event
   */
  public currentRequest?: () => Promise<any>;

  /**
   * Is multiple
   */
  public isMultiple = false;

  /**
   * Map option callback
   */
  public mapOptionCallback: (option: any) => any = option => ({
    label: getLocalizedValue(
      option.label || option.name || option.title || option.text,
    ),
    value: String(option.value || option.id),
  });

  /**
   * Determine if it is a multiple input
   */
  public multiple(isMultiple = true) {
    this.isMultiple = isMultiple;
    return this;
  }

  /**
   * Set service class
   */
  public service(service: RestfulEndpoint) {
    this._service = service;
    return this;
  }

  /**
   * Set options list
   */
  public options(optionsList: any[]) {
    this.optionsList = optionsList;
    return this;
  }

  /**
   * Map option callback
   */
  public mapOption(
    optionCallback: (option: any) => {
      label: React.ReactNode;
      value: string;
    },
  ) {
    this.mapOptionCallback = optionCallback;
    return this;
  }

  /**
   * Chips color
   */
  public color(color: ChipProps["color"]) {
    this.componentProps.color = color;

    return this;
  }

  /**
   * {@inheritDoc}
   */
  protected parseDefaultChecked() {
    if (this.isMultiple) {
      return get(
        this.record,
        this.data.defaultValueKey,
        this.data.defaultChecked || [],
      ).map(value => value.id || value);
    }

    const value = get(
      this.record,
      this.data.defaultValueKey,
      this.data.defaultChecked || {},
    );

    return value?.id || value;
  }

  /**
   * Set request
   */
  public request(request: () => Promise<any>) {
    this.currentRequest = request;
    return this;
  }

  /**
   * Render the input
   */
  protected renderContent() {
    const { props, Component, wrapperProps } = this.prepareRendering();

    // we'll use custom key to force re-render the input if the record data has been changed
    // @see setRecord method

    const { defaultChecked, ...rest } = props;

    return (
      <ChipsInputRenderer
        Component={Component}
        props={rest}
        defaultChecked={defaultChecked}
        key={this._key}
        wrapperProps={wrapperProps}
        builder={this}
        data={this.optionsList}
        request={
          this._service
            ? this._service.list.bind(this._service)
            : this.currentRequest
        }
      />
    );
  }
}
