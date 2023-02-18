import { FileInput } from "../../components/Form/FileInput";
import { InputBuilder } from "./InputBuilder";

export class FileInputBuilder extends InputBuilder {
  /**
   * Define what are the accepted file types
   */
  public accept(accept: string) {
    this.componentProps.accept = accept;
    return this;
  }

  /**
   * {@inheritDoc}
   */
  public boot(): void {
    this.component(FileInput);
  }
}
