import { ImageInputBuilder } from "../components";

export function circleImageInput(name: string) {
  return new ImageInputBuilder(name).circle().width(50).height(50);
}
