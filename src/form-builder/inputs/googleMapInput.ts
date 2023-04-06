import { GoogleMapInput } from "../../components";
import { InputBuilder } from "../components";

export function googleMapInput(name: string) {
  return new InputBuilder(name).component(GoogleMapInput);
}
