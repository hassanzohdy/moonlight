import { RatingInput } from "../../components";
import { InputBuilder } from "../components";

export function ratingInput(name = "rating") {
  return new InputBuilder(name).component(RatingInput);
}
