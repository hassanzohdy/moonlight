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
   * Accept only pdf files
   */
  public pdf() {
    this.componentProps.accept = "application/pdf";
    return this;
  }

  /**
   * Accept only doc files whether microsoft word or google docs or any other
   */
  public doc() {
    this.componentProps.accept = ".doc, .docx";
    return this;
  }

  /**
   * {@inheritDoc}
   */
  public boot(): void {
    this.component(DropzoneInput);
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
}
