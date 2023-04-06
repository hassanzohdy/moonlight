import { ImageInputBuilder } from "../components";

export function imageInput(name: string) {
  return new ImageInputBuilder(name).previewWidth(100).previewHeight(100);
}
