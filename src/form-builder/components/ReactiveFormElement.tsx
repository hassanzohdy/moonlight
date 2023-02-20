import { ReactiveForm } from "./ReactiveForm";

export class ReactiveFormElement {
  /**
   * Reactive form instance
   */
  public reactiveForm!: ReactiveForm;

  /**
   * Set reactive form instance
   */
  public setReactiveForm(reactiveForm: ReactiveForm) {
    this.reactiveForm = reactiveForm;
    return this;
  }
}
