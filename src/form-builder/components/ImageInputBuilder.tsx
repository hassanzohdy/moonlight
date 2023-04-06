import { ImageInput } from "../../components/Form/ImageInput";
import { InputBuilder } from "./InputBuilder";

export class ImageInputBuilder extends InputBuilder {
  /**
   * {@inheritDoc}
   */
  public boot(): void {
    this.component(ImageInput);

    this.shouldDisplay("placeholder", false);
  }

  /**
   * Set image width for that must be uploaded
   */
  public width(width: number) {
    this.componentProps.imageWIdth = width;
    return this;
  }

  /**
   * Set image height for that must be uploaded
   */
  public height(height: number) {
    this.componentProps.imageHeight = height;
    return this;
  }

  /**
   * Min width for the uploaded image
   */
  public minWidth(width: number) {
    this.componentProps.minWidth = width;
    return this;
  }

  /**
   * Max width for the uploaded image
   */
  public maxWidth(width: number) {
    this.componentProps.maxWidth = width;
    return this;
  }

  /**
   * Min height for the uploaded image
   */
  public minHeight(height: number) {
    this.componentProps.minHeight = height;
    return this;
  }

  /**
   * Max height for the uploaded image
   */
  public maxHeight(height: number) {
    this.componentProps.maxHeight = height;
    return this;
  }

  /**
   * Set image min size in kb
   */
  public minSize(size: number) {
    this.componentProps.minSize = size;
    return this;
  }

  /**
   * Set image max size in kb
   */
  public maxSize(size: number) {
    this.componentProps.maxSize = size;
    return this;
  }

  /**
   * Whether to circle the image
   */
  public circle(circle = true) {
    this.componentProps.circle = circle;
    return this;
  }

  /**
   * Set image preview width
   */
  public previewWidth(width: number) {
    this.componentProps.width = width;
    return this;
  }

  /**
   * Set image preview height
   */
  public previewHeight(height: number) {
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
}
