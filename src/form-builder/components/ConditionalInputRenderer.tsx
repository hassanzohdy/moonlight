import React, { useEffect, useState } from "react";
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
  const [content, setContent] = useState<any>(
    conditionalInputsRenderer.isMatched
      ? inputs.map((input, index) => (
          <React.Fragment key={index}>{input.render()}</React.Fragment>
        ))
      : null,
  );

  useEffect(() => {
    conditionalInputsRenderer.listenForConditionalMatch(isMatched => {
      if (!isMatched) {
        setContent(null);
      } else {
        setContent(
          inputs.map((input, index) => (
            <React.Fragment key={index}>{input.render()}</React.Fragment>
          )),
        );
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
