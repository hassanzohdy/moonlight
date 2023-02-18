import { RichTextEditor } from "../../components";
import { InputBuilder } from "../components";

export function richTextInput(name: string) {
  return new InputBuilder(name).component(RichTextEditor);
}
