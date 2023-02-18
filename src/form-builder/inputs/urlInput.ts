import { UrlInput } from "../../components/";
import { InputBuilder } from "../components";

export function urlInput(name: string) {
  return new InputBuilder(name).component(UrlInput);
}
