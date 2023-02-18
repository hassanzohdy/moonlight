import { DropzoneInputBuilder } from "../components";

export function dropzoneInput(name: string) {
  return new DropzoneInputBuilder(name);
}
