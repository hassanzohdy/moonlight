import { InputBuilder, MultiLingualBuilder } from "../components";

export function multiLingualInput(inputBuilder: InputBuilder) {
  return new MultiLingualBuilder("").setInput(inputBuilder);
}
