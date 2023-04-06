import { CustomInputBuilder } from "../components";

export function reactiveInput(Component: any, name = "") {
  return new CustomInputBuilder(name).component(Component);
}
