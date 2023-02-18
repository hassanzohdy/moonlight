import { CustomInputBuilder } from "../components";

export function component(Component: any, name = "") {
  return new CustomInputBuilder(name).component(Component);
}
