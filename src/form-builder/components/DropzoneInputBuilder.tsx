import { DropzoneInput } from "../../components/Form/DropzoneInput";
import { InputBuilder } from "./InputBuilder";

export class DropzoneInputBuilder extends InputBuilder {
  /**
   * Whether allow images only
   */
  public images(images = true) {
    this.componentProps.images = images;
    return this;
  }

  /**
   * {@inheritDoc}
   */
  public boot(): void {
    this.component(DropzoneInput);
  }
}
