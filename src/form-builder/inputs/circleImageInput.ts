import { ImageInputBuilder } from "../components";

export function circleImageInput(name: string) {
  return new ImageInputBuilder(name)
    .circle()
    .previewWidth(50)
    .previewHeight(50);
}
