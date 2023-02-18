import { ImageInputBuilder } from "../components";

export function imageInput(name: string) {
  return new ImageInputBuilder(name).width(100).height(100);
}
