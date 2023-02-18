import { Col } from "@mantine/core";
import { converter, trans } from "@mongez/localization";
import { Random } from "@mongez/reinforcements";
import { PasswordInput } from "../../components/Form/PasswordInput";
import { InputBuilder } from "./InputBuilder";

export class PasswordInputBuilder extends InputBuilder {
  /**
   * Is confirmed password
   */
  protected isConfirmed = false;

  /**
   * Confirm password input
   */
  protected confirmPasswordInput?: PasswordInputBuilder;

  /**
   * Boot
   */
  protected boot() {
    this.component(PasswordInput).type("password");

    this.autoComplete(false);
  }

  /**
   * Determine whether to display the confirm password input
   */
  public confirmed(confirmed = true) {
    this.isConfirmed = confirmed;
    return this;
  }

  /**
   * {@inheritDoc}
   */
  public clearCache(): this {
    super.clearCache();

    if (this.confirmPasswordInput) {
      this.confirmPasswordInput.clearCache();
    }

    return this;
  }

  /**
   * Set min length for the password
   */
  public minLength(length: number) {
    this.componentProps.minLength = length;

    return this;
  }

  /**
   * {@inheritDoc}
   */
  public render() {
    if (!this.isConfirmed) {
      return super.render();
    }

    const props = this.prepareProps();

    if (!props.id) {
      props.id = Random.id();
    }

    if (!this.confirmPasswordInput) {
      this.confirmPasswordInput = new PasswordInputBuilder(
        this.data.name + "_confirmation"
      );
    }

    // split the column by half so that the confirm password input will be
    // displayed in the same line
    if (!this.data.col) {
      this.col({
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6,
      });
    }

    this.confirmPasswordInput.col("auto");

    if (props.label) {
      this.confirmPasswordInput.label(
        trans("confirmInput", { input: props.label })
      );
    }

    if (props.placeholder) {
      this.confirmPasswordInput.placeholder(
        converter("confirmInput", { input: props.placeholder })
      );
    }

    this.confirmPasswordInput.updateComponentProps({
      matchElement: props.id,
      matchText: props.label || props.placeholder,
    });

    if (this.componentProps.minLength) {
      this.confirmPasswordInput.minLength(this.componentProps.minLength);
    }

    const Component = this.data.component;

    const password = <Component {...props} />;

    return (
      <>
        <Col {...this.getWrapperProps()}>{password}</Col>
        {this.confirmPasswordInput.setRecord(this.record).render()}
      </>
    );
  }
}
