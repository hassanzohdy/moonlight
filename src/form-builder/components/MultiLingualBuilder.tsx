import { Col, Grid } from "@mantine/core";
import { ColSpan } from "@mantine/core/lib/Grid/Col/Col.styles";
import { transFrom } from "@mongez/localization";
import { HiddenInput } from "@mongez/react-form";
import { get } from "@mongez/reinforcements";
import { getMoonlightConfig } from "../../config";
import { getLocaleCodes } from "../../utils/localization";
import { InputBuilder } from "./InputBuilder";
import { InputRenderer } from "./InputRenderer";

export class MultiLingualBuilder extends InputBuilder {
  /**
   * Input builder
   */
  protected input!: InputBuilder;

  /**
   * Default col size
   */
  protected defaultColSize: ColSpan = "auto";

  /**
   * Set input builder
   */
  public setInput(input: InputBuilder) {
    this.input = input;
    return this;
  }

  /**
   * {@inheritdoc}
   */
  public render() {
    if (this.content) {
      return this.content;
    }

    const sizes = this.getColSize();

    this.input.setRecord(this.record);

    const value = get(this.record, this.input.name());

    const localeCodesList = getMoonlightConfig("localeCodes", {});

    const getFromValue = () => {
      const localeCodes: any[] = [];

      for (const localeCodeData of value) {
        const localeCode = localeCodesList[localeCodeData.localeCode] as any;

        // WTF is this?
        localeCode.localeCode = localeCodeData.localeCode;

        if (localeCode) {
          localeCodes.push(localeCode);
        }
      }

      return localeCodes;
    };

    if (value && !Array.isArray(value)) {
      const input: InputBuilder = this.input.clone();

      return input
        .hint(this._hint)
        .hintOptions(this._hintOptions)
        .description(this._description)
        .render();
    }

    const localeCodes = value ? getFromValue() : getLocaleCodes();

    const baseInputName = this.name();

    const renderedComponents = localeCodes.map((localeCodeObject, index) => {
      const { localeCode } = localeCodeObject;
      const input: InputBuilder = this.input.clone();

      if (input.isAutoFocused() && index > 0) {
        input.autoFocus(false);
      }

      const originalName = baseInputName + input.name();

      const inputName = originalName + "." + index;

      input.hintOptions && input.hintOptions(this._hintOptions);

      input
        .setName(inputName + ".value")
        .description(
          <>
            {this._description
              ? typeof this._description === "string"
                ? transFrom(localeCode, this._description)
                : this._description
              : null}
            {`${localeCodeObject.name} (${localeCode})`}
          </>,
        )
        .label(
          transFrom(localeCode, input.data.label.value || originalName),
          false,
        )
        .onChange(value => {
          const localeCodeInput = this.form.form.control(
            `${inputName}.localeCode`,
          );

          if (!localeCodeInput) return;
          if (!value) {
            // if no value, then change the value of the hidden input of the locale code
            localeCodeInput.change("");
          } else {
            // if there is a value, then change the value of the hidden input of the locale code
            localeCodeInput.change(localeCode);
          }
        })
        .updateComponentProps({
          dir: localeCodeObject.direction,
        })
        .setDefaultValueKey(`${inputName}.value`)
        .placeholder(
          transFrom(localeCode, input.data.placeholder.value || originalName),
          false,
        );

      if (this._hint) {
        input.hint(
          typeof this._hint === "string"
            ? transFrom(localeCode, this._hint)
            : this._hint,
        );
      }

      const content = (
        <Grid.Col {...sizes} key={input.name() + localeCode}>
          <HiddenInput
            name={`${inputName}.localeCode`}
            key={`${inputName}.localeCode`}
            value={value ? localeCode : ""}
          />

          {input.render()}
        </Grid.Col>
      );

      return content;
    });

    const { wrapperProps } = this.prepareRendering();

    wrapperProps.span = 12;

    this.content = (
      <InputRenderer
        Wrapper={Col}
        inputBuilder={this}
        key={this._key}
        wrapperProps={wrapperProps}>
        <Grid>{renderedComponents}</Grid>
      </InputRenderer>
    );

    return this.content;
  }
}
