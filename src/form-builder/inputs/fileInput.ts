import { FileInputBuilder } from "../components";

export function fileInput(name: string) {
  return new FileInputBuilder(name);
}
