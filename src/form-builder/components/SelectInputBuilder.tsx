import { EventSubscription } from "@mongez/events";
import { RestfulEndpoint } from "@mongez/http";
import { debounce, get } from "@mongez/reinforcements";
import { MultiSelectInput, SelectInput } from "../../components/Form/Select";
import { InputBuilder } from "./InputBuilder";
import { SelectInputBuilderRenderer } from "./SelectInputBuilderRenderer";

export class SelectInputBuilder extends InputBuilder {
  /**
   * select requests list
   */
  public requestsList: {
    request?: (props: any) => Promise<any>;
    lazyRequest?: (props: any) => Promise<any>;
    searchRequest?: (props: any, record: any) => Promise<any>;
    dynamicRequest?: (props: any) => Promise<any>;
  } = {
    request: undefined,
    lazyRequest: undefined,
    searchRequest: undefined,
    dynamicRequest: undefined,
  };

  /**
   * Service class
   */
  public restfulService?: RestfulEndpoint;

  /**
   * Determine if it is a lazy service or not
   */
  protected isLazyService = false;

  /**
   * Load options except the value from the settled records's key
   */
  protected exceptKey = "";

  /**
   * Determine whether is multiple
   */
  protected isMultiple = false;

  /**
   * Reset Event
   */
  protected resetEvent?: EventSubscription;

  /**
   * Spawns list of inputs
   */
  public spawning: {
    selectBuilder?: SelectInputBuilder;
    displayed: boolean;
    initialValue?: any;
    searchAs?:
      | string
      | ((value: string) => {
          [key: string]: any;
        });
  } = {
    displayed: false,
  };

  /**
   * Boot
   */
  protected boot() {
    //
    this.component(SelectInput);
  }

  /**
   * Set dropdown position
   */
  public dropdownPosition(position: "bottom" | "top" | "flip") {
    this.componentProps.dropdownPosition = position;

    return this;
  }

  /**
   * Determine if select input is multiple
   */
  public multiple(isMultiple = true) {
    this.isMultiple = isMultiple;
    this.component(isMultiple ? MultiSelectInput : SelectInput);

    if (isMultiple) {
      this.defaultValue([]);
    }

    return this;
  }

  /**
   * Map options
   */
  public mapOption(option: any) {
    this.componentProps.mapOption = option;

    return this;
  }

  /**
   * Set service class
   */
  public service(service: RestfulEndpoint) {
    this.restfulService = service;
    return this;
  }

  /**
   * Set options
   */
  public options(options: any[]) {
    this.componentProps.data = options;

    return this;
  }

  /**
   * Spawns a new select input
   */
  public spawns(
    input: SelectInputBuilder,
    searchAs: typeof this.spawning.searchAs,
  ) {
    this.spawning.selectBuilder = input;
    this.spawning.searchAs = searchAs;

    return this;
  }

  /**
   * Load request lazily
   */
  public lazy(isLazy = true) {
    this.isLazyService = isLazy;
    return this;
  }

  /**
   * Load options except the given key
   */
  public except(key: string) {
    this.exceptKey = key;
    return this;
  }

  /**
   * {@inheritDoc}
   */
  protected parseDefaultValue() {
    if (this.isMultiple) {
      return get(
        this.record,
        this.data.defaultValueKey,
        this.inputDefaultValue || [],
      ).map(value => value.id || value);
    }

    const value = get(
      this.record,
      this.data.defaultValueKey,
      this.inputDefaultValue || "",
    );

    return value?.id || value;
  }

  /**
   * Set limit
   */
  public limit(limit: number) {
    this.componentProps.limit = limit;
    return this;
  }

  /**
   * Set request
   */
  public request(request: any) {
    this.requestsList.request = request;
    return this;
  }

  /**
   * Set lazy request
   */
  public lazyRequest(request: any) {
    this.requestsList.lazyRequest = request;
    return this;
  }

  /**
   * Set search request
   */
  public searchRequest(request: any) {
    this.requestsList.searchRequest = request;
    return this;
  }

  /**
   * Set dynamic request
   */
  public dynamicRequest(request: any) {
    this.requestsList.dynamicRequest = request;
    return this;
  }

  /**
   * {@inheritDoc}
   */
  protected preparingProps(): void {
    debounce(() => {
      // reset the select builder on form control reset event trigger
      // this is mainly used to hide spawns from current select input
      if (!this.formControl) return;

      if (this.resetEvent) {
        this.resetEvent.unsubscribe();
      }

      this.resetEvent = this.formControl.onReset(() => {
        if (this.spawning.displayed) {
          this.hideSpawns();
          this.reRender();
        }
      });
    }, 150);

    let foundRequest = false;

    for (const requestName in this.requestsList) {
      let request = this.requestsList[requestName];

      if (requestName === "searchRequest" && request) {
        request = (keywords: string) =>
          this.requestsList.searchRequest?.(keywords, this.record);
      }

      if (request) {
        foundRequest = true;
        this.componentProps[requestName] = request;
      }
    }

    if (this.restfulService && !foundRequest) {
      const requestProp = this.isLazyService ? "lazyRequest" : "request";

      this.componentProps[requestProp] = () => this.restfulService?.list();
    }

    // now let's check for the spawns list
    // this be updated as follows
    // when current select input changes, it will update the spawns list
    // and the spawns list will be updated as well
    if (this.spawning.selectBuilder) {
      const userOnChangeProp = this.componentProps.onChange;

      const selectInput = this.spawning.selectBuilder;

      this.componentProps.onChange = (value, options) => {
        userOnChangeProp && userOnChangeProp(value, options);

        this.spawning.displayed = true;

        if (value) {
          const searchAs = this.spawning.searchAs;

          const searchAsValue =
            typeof searchAs === "function"
              ? searchAs(value)
              : { [searchAs as string]: value };

          selectInput.data.propsFromParent = searchAsValue;

          selectInput.dynamicRequest(() => {
            return selectInput.restfulService?.list(searchAsValue);
          });

          selectInput.generateNewKey();

          this.hideNestedSpawns();
        } else {
          this.hideSpawns();
        }

        selectInput.clearCache();
        this.clearCache();

        this.reRender();
      };
    }

    if (this.exceptKey) {
      let exceptValue = get(this.record, this.exceptKey);

      if (!Array.isArray(exceptValue)) {
        exceptValue = exceptValue ? [exceptValue] : undefined;
      }

      this.componentProps.except = exceptValue;
    }
  }

  /**
   * Hide current spawn and any nested spawns
   */
  public hideSpawns() {
    this.spawning.displayed = false;

    this.hideNestedSpawns();
  }

  /**
   * Hide nested spawns
   */
  public hideNestedSpawns() {
    if (this.spawning.selectBuilder) {
      this.spawning.selectBuilder.hideSpawns();
    }
  }

  /**
   * Triggered when form is closed
   */
  protected onFormClose() {
    if (this.spawning.displayed) {
      this.hideSpawns();
    }
  }

  /**
   * Render the input
   */
  protected renderContent() {
    const { props, Component, wrapperProps } = this.prepareRendering();

    // we'll use custom key to force re-render the input if the record data has been changed
    // @see setRecord method

    if (this.spawning.selectBuilder) {
      this.spawning.selectBuilder?.col(wrapperProps.span);
    }

    return (
      <SelectInputBuilderRenderer
        Component={Component}
        props={props}
        key={this._key}
        wrapperProps={wrapperProps}
        selectInputBuilder={this}
      />
    );
  }
}
