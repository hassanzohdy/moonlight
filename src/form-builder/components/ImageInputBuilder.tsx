import { ImageInput } from "../../components/Form/ImageInput";
import { InputBuilder } from "./InputBuilder";

export class ImageInputBuilder extends InputBuilder {
  /**
   * Whether to circle the image
   */
  public circle(circle = true) {
    this.componentProps.circle = circle;
    return this;
  }

  /**
   * Set image width
   */
  public width(width: number) {
    this.componentProps.width = width;
    return this;
  }

  /**
   * Set image height
   */
  public height(height: number) {
    this.componentProps.height = height;
    return this;
  }

  /**
   * Determine if input image can be clearable
   */
  public clearable(clearable = true) {
    this.componentProps.clearable = clearable;
    return this;
  }

  /**
   * {@inheritDoc}
   */
  public boot(): void {
    this.component(ImageInput);
  }
}
