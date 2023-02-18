import { ChooseInput } from "../../components";
import { InputBuilder } from "../components";

export function chooseInput(name: string, data: any) {
  return new InputBuilder(name).component(ChooseInput).updateComponentProps({
    data,
  });
}
