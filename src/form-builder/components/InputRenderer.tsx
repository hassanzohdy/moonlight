import React, { useEffect, useState } from "react";
import { InputBuilder } from "./InputBuilder";

export type InputRendererProps = {
  inputBuilder: InputBuilder;
  children: React.ReactNode;
  Wrapper: React.ComponentType<any>;
  wrapperProps: any;
};

export function InputRenderer({
  inputBuilder,
  Wrapper,
  children,
  wrapperProps,
}: InputRendererProps) {
  const [content, setContent] = useState(() => (
    <Wrapper {...wrapperProps}>{children}</Wrapper>
  ));

  useEffect(() => {
    inputBuilder.setReRenderHandler(setContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      inputBuilder.clearCache();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return content;
}
