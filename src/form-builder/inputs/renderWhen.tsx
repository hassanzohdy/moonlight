import { ConditionalRenderBuilder, InputBuilder } from "../components";

export function renderWhen(input: string, value: any, inputs: InputBuilder[]) {
  return new ConditionalRenderBuilder("").setCondition(input, value, inputs);
}
