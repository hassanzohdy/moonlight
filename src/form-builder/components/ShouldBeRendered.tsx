import { ReactiveFormElement } from "./ReactiveFormElement";

export class ShouldBeRendered extends ReactiveFormElement {
  /**
   * Determine if element should be rendered
   */
  protected shouldBeRendered: boolean | ((callback: this) => boolean) = true;

  /**
   * Set if element should be rendered
   */
  public when(shouldBeRendered: boolean | ((callback: this) => boolean)) {
    this.shouldBeRendered = shouldBeRendered;
    return this;
  }
}
