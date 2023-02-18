import { useEffect, useState } from "react";
import { ConditionalRenderBuilder } from "./ConditionalRenderBuilder";
import { InputBuilder } from "./InputBuilder";

export type ConditionalInputRendererProps = {
  inputsProps: any;
  conditionalInputsRenderer: ConditionalRenderBuilder;
  inputs: InputBuilder[];
};

export function ConditionalInputRenderer({
  inputs,
  conditionalInputsRenderer,
}: ConditionalInputRendererProps) {
  const [content, setContent] = useState<any>(() => null);

  useEffect(() => {
    if (conditionalInputsRenderer.isMatched) {
      setContent(inputs.map(input => input.render()));
    }
    conditionalInputsRenderer.listenForConditionalMatch(isMatched => {
      if (!isMatched) {
        setContent(null);
      } else {
        setContent(inputs.map(input => input.render()));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      conditionalInputsRenderer.clearCache();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return content;
}
