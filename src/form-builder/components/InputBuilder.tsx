import { Col, MantineSize } from "@mantine/core";
import { ColSpan } from "@mantine/core/lib/Grid/Col/Col.styles";
import { trans } from "@mongez/localization";
import { clone, get, Random, rtrim } from "@mongez/reinforcements";
import { IconHelp } from "@tabler/icons";
import React from "react";
import { TextInput } from "../../components/Form/TextInput";
import { Tooltip } from "../../components/Tooltip";
import { queryString } from "../../utils/resolvers";
import { FormTab } from "./FormTab";
import { InputRenderer } from "./InputRenderer";
import { ReactiveForm } from "./ReactiveForm";

export type ColumnSize =
  | ColSpan
  | Partial<Record<MantineSize | "span", ColSpan>>;

export class InputBuilder {
  /**
   * Auto translate label and placeholder
   */
  protected autoTranslate = true;

  /**
   * Reactive form instance
   */
  public form!: ReactiveForm;

  /**
   * Prepared props
   */
  protected preparedProps: any;

  public id = Random.id();

  /**
   * Input data
   */
  public data: any = {
    col: undefined,
    required: false,
    name: "",
    type: "text",
    component: TextInput,
    defaultValueKey: "",
    placeholder: {
      value: "",
      transform: true,
      display: true,
      translate: true,
    },
    label: {
      value: "",
      transform: true,
      display: true,
      translate: true,
    },
    requiredIf: {
      key: "",
      exists: false,
    },
    autoComplete: true,
    defaultChecked: undefined,
  };

  /**
   * Component props
   */
  public componentProps: any = {};

  /**
   * Default col size
   */
  protected defaultColSize: ColSpan = 12;

  /**
   * cache rendered content
   */
  public content: any;

  /**
   * Form input tab that might belong to
   */
  public tab?: FormTab;

  /**
   * Reading value from query string
   */
  protected valueFromQueryString = "";

  /**
   * Previous record
   */
  protected record: any;

  /**
   * Input default value
   */
  protected inputDefaultValue: any;

  /**
   * Input description
   */
  protected _description?: React.ReactNode = null;

  /**
   * Input hint
   */
  protected _hint: React.ReactNode = null;

  /**
   * Re-render handler
   */
  protected reRenderer: any;

  /**
   * Form input key
   */
  public _key: string = Random.string();

  /**
   * Form input callbacks
   */
  protected callbacks: any = {
    onChange: null,
    rendered: [],
  };

  /**
   * Constructor
   */
  public constructor(name: string) {
    this.data.name = name;

    this.data.defaultValueKey = rtrim(name || "", "[]");

    this.boot();
  }

  /**
   * Add event when input is rendered
   */
  public onRendered(callback: (input: InputBuilder) => void) {
    this.callbacks.rendered.push(callback);

    return this;
  }

  /**
   * Boot
   */
  protected boot() {
    //
  }

  /**
   * Wether to mark component as readOnly
   */
  public readOnly(readOnly = true) {
    this.componentProps.readOnly = readOnly;

    return this;
  }

  /**
   * Determine if input is default checked
   *
   * Works only with `radio` `checkbox` and `switch` types
   */
  public defaultChecked(isChecked = true) {
    this.data.defaultChecked = isChecked;

    return this;
  }

  /**
   * Get Form control instance
   */
  public get formControl() {
    return this.form?.form?.control(this.data.name);
  }

  /**
   * Set input description
   */
  public description(description: React.ReactNode) {
    this._description = description;
    return this;
  }

  /**
   * Set re-render handler
   */
  public setReRenderHandler(handler: any) {
    this.reRenderer = handler;

    return this;
  }

  /**
   * Trigger re render
   */
  public reRender() {
    this.clearCache();
    this.reRenderer && this.reRenderer(this.render());
  }

  /**
   * Set form tab
   */
  public setTab(tab: FormTab) {
    this.tab = tab;
    return this;
  }

  /**
   * Set reactive form
   */
  public setForm(form: ReactiveForm) {
    this.form = form;

    this.form.on("close", this.onFormClose.bind(this));
    return this;
  }

  /**
   * Trigger that the input is rendered
   */
  public rendered() {
    for (const callback of this.callbacks.rendered) {
      callback(this);
    }
  }

  /**
   * Triggered when form is closed
   */
  protected onFormClose() {
    //
  }

  /**
   * Add on change callback
   */
  public onChange(
    callback: (value: any, options: any, inputBuilder: InputBuilder) => void
  ) {
    this.callbacks.onChange = callback;
    return this;
  }

  /**
   * Set input hint
   */
  public hint(hint: React.ReactNode) {
    this._hint = hint;
    return this;
  }

  /**
   * Set input default value
   */
  public defaultValue(value: any) {
    this.inputDefaultValue = value;
    return this;
  }

  /**
   * Read value from query string as default value
   */
  public readValueFromQueryString(key: string) {
    this.valueFromQueryString = key;
    return this;
  }

  /**
   * Check if input has col value
   */
  public hasCol() {
    return this.data.col !== undefined;
  }

  /**
   * Enable or disable autoComplete
   */
  public autoComplete(autoComplete = true) {
    this.data.autoComplete = autoComplete;
    return this;
  }

  /**
   * Auto focus on component
   */
  public autoFocus(autoFocus = true) {
    this.componentProps.autoFocus = autoFocus;
    return this;
  }

  /**
   * Check if component is auto focused
   */
  public isAutoFocused() {
    return this.componentProps.autoFocus === true;
  }

  /**
   * Trigger focus on component
   */
  public focus() {
    this.formControl?.focus(true);
  }

  /**
   * Auto translate label and placeholder
   */
  public autoTrans(autoTranslate = true) {
    this.autoTranslate = autoTranslate;
    return this;
  }

  /**
   * Required if exists key
   */
  public requiredIfExists(key: string, exists = true) {
    this.data.requiredIf = {
      key,
      exists,
    };

    return this;
  }

  /**
   * Required if not exists
   */
  public requiredIfNotExists(key: string) {
    return this.requiredIfExists(key, false);
  }

  /**
   * Determine whether to auto transform the name into placeholder or label
   */
  public autoTransform(key: "placeholder" | "label", autoTransform = true) {
    this.data[key].transform = autoTransform;
    return this;
  }

  /**
   * Determine whether the label should be displayed
   */
  public shouldDisplay(key: "placeholder" | "label", display = true) {
    this.data[key].display = display;

    return this;
  }

  /**
   * Set input default value key
   */
  public setDefaultValueKey(key?: string) {
    this.data.defaultValueKey = key;
    return this;
  }

  /**
   * Mark input as required
   */
  public required(required = true) {
    this.data.required = required;
    return this;
  }

  /**
   * Set component type
   */
  public type(type: string) {
    this.data.type = type;
    return this;
  }

  /**
   * Set input size
   */
  public col(col: ColumnSize) {
    if (typeof col === "object") {
      this.data.breakpoint = col;
    } else {
      this.data.col = col;
    }

    return this;
  }

  /**
   * Get input name
   */
  public name() {
    return this.data.name;
  }

  /**
   * Set input name
   */
  public setName(name: string) {
    this.data.name = name;
    return this;
  }

  /**
   * Determine whether the label or placeholder should be translated
   */
  public shouldAutoTranslate(key: "placeholder" | "label") {
    return this.autoTranslate && this.data[key].transform;
  }

  /**
   * Update component props
   */
  public updateComponentProps(props: any) {
    this.componentProps = { ...this.componentProps, ...props };
    return this;
  }

  /**
   * Set component props
   */
  public setComponentProps(props: any) {
    this.componentProps = props;
    return this;
  }

  /**
   * Set label
   */
  public label(label: React.ReactNode, translate = true) {
    this.data.label.value = label;

    this.data.label.translate = translate;
    return this;
  }

  /**
   * Set placeholder
   */
  public placeholder(placeholder: string, translate = true) {
    this.data.placeholder.value = placeholder;
    this.data.placeholder.translate = translate;
    return this;
  }

  /**
   * Set input component
   */
  public component(component: any, componentProps: any = {}) {
    this.data.component = component;
    this.componentProps = componentProps;
    return this;
  }

  /**
   * Generate new random key to current input
   */
  public generateNewKey() {
    this._key = Random.string(36);
    return this;
  }

  /**
   * Set record
   */
  public setRecord(record: any) {
    if (record !== this.record) {
      this.generateNewKey();
    }

    this.record = record;
    return this;
  }

  /**
   * Get label
   */
  public getLabel() {
    if (this.data.label.display) {
      if (!this.data.label.touched) {
        if (!this.data.label.value && this.data.label.transform) {
          this.data.label.value = trans(this.data.name);
          this.data.label.touched = true;
        } else if (this.data.label.value && this.data.label.translate) {
          this.data.label.value = trans(this.data.label.value);
          this.data.label.touched = true;
        }
      }

      return this.data.label.value;
    }

    return undefined;
  }

  /**
   * Clear cached content
   */
  public clearCache() {
    this.preparedProps = undefined;
    this.content = undefined;

    return this;
  }

  /**
   * Cache content
   * If content is not cached, then call the given callback and cache the result
   */
  protected cacheContent(callback: () => React.ReactNode) {
    if (this.content) return this.content;

    this.content = callback();

    return this.content;
  }

  /**
   * Render the input
   */
  public render() {
    return this.cacheContent(this.renderContent.bind(this));
  }

  /**
   * Render content
   */
  protected renderContent() {
    const { props, Component, wrapperProps } = this.prepareRendering();

    // we'll use custom key to force re-render the input if the record data has been changed
    // @see setRecord method

    return (
      <InputRenderer
        Wrapper={Col}
        inputBuilder={this}
        key={this._key}
        wrapperProps={wrapperProps}
      >
        <Component {...props} />
      </InputRenderer>
    );
  }

  /**
   * Prepare rendering
   */
  protected prepareRendering() {
    const props = this.preparedProps || this.prepareProps();
    const Component = this.data.component;

    return {
      props,
      Component,
      wrapperProps: this.getWrapperProps(),
    };
  }

  /**
   * Get Wrapper props
   */
  public getWrapperProps() {
    return this.getColSize();
  }

  /**
   * Get col size
   */
  public getColSize() {
    if (this.data.breakpoint) {
      const props: any = {};

      for (const breakpoint in this.data.breakpoint) {
        props[breakpoint] = this.data.breakpoint[breakpoint];
      }

      return props;
    }
    return {
      span: this.data.col !== undefined ? this.data.col : this.defaultColSize,
    };
  }

  /**
   * Called when preparing props
   */
  protected preparingProps() {
    //
  }

  /**
   * Prepare props
   */
  protected prepareProps() {
    this.preparingProps();
    const props: any = { ...this.componentProps };

    props.name = this.data.name;
    props.required = this.data.required;

    props.label = this.getLabel();

    if (this._description) {
      const description =
        typeof this._description === "string"
          ? trans(this._description)
          : this._description;

      props.description = description;
    }

    if (this.callbacks.onChange) {
      props.onChange = (...args: any[]) => {
        this.callbacks.onChange(...args{}, this);
      };
    }

    if (this._hint) {
      const hint =
        typeof this._hint === "string" ? trans(this._hint) : this._hint;
      props.description = (
        <>
          {props.description || trans("didYouKnow")}
          <Tooltip width={550} multiline label={hint}>
            <span
              style={{
                verticalAlign: "middle",
                marginInlineStart: "0.2rem",
                display: "inline-block",
              }}
            >
              <IconHelp size="1.0rem" />
            </span>
          </Tooltip>
        </>
      );
    }

    if (this.data.placeholder.display) {
      if (!this.data.placeholder.touched) {
        if (!this.data.placeholder.value && this.data.placeholder.transform) {
          this.data.placeholder.value = trans(this.data.name);
          this.data.placeholder.touched = true;
        } else if (
          this.data.placeholder.value &&
          this.data.placeholder.translate
        ) {
          this.data.placeholder.value = trans(this.data.placeholder.value);
          this.data.placeholder.touched = true;
        }
      }

      props.placeholder = this.data.placeholder.value;
    }

    if (this.data.requiredIf.key) {
      props.required =
        !!get(this.record, this.data.requiredIf.key) ===
        this.data.requiredIf.exists;
    }

    if (this.data.autoComplete === false) {
      props.autoComplete = "new-password";
    }

    if (this.callbacks.onError) {
      props.onError = (error) => {
        if (this.callbacks.onError) {
          this.callbacks.onError(error, this);
        }
      };
    }

    if (["checkbox", "radio", "switch"].includes(this.data.type)) {
      if (props.defaultChecked === undefined) {
        props.defaultChecked = this.parseDefaultChecked();
      }
    } else {
      props.defaultValue = this.parseDefaultValue();
    }

    return (this.preparedProps = props);
  }

  /**
   * Parse default value
   */
  protected parseDefaultValue() {
    let defaultValue = get(this.record, this.data.defaultValueKey);

    if (!defaultValue) {
      if (this.valueFromQueryString) {
        defaultValue =
          queryString.get?.(
            this.valueFromQueryString,
            this.inputDefaultValue
          ) || this.inputDefaultValue;
      } else {
        defaultValue = this.inputDefaultValue;
      }
    }

    if (defaultValue === null) {
      defaultValue = undefined;
    }

    return defaultValue;
  }

  /**
   * Parse default checked
   */
  protected parseDefaultChecked() {
    return get(
      this.record,
      this.data.defaultValueKey,
      this.data.defaultChecked
    );
  }

  /**
   * Clone current input builder
   */
  public clone() {
    const builder = new (this.constructor as any)(this.data.name);

    for (const key in this) {
      const value: any = this[key];

      if (value?.clone) {
        builder[key] = value.clone();
      } else {
        builder[key] = clone(this[key]);
      }
    }

    // builder.data = clone(this.data);

    // builder.callbacks = clone(this.callbacks);

    // builder.componentProps = clone(this.componentProps);

    // builder.record = this.record;

    // builder._key = this._key;

    // builder._description = this._description;

    // builder._hint = this._hint;

    // builder.inputDefaultValue = this.inputDefaultValue;

    return builder;
  }
}
