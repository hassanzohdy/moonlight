import { Col } from "@mantine/core";
import { useForceUpdate } from "@mongez/react-hooks";
import React, { useEffect } from "react";
import { SelectInputBuilder } from "./SelectInputBuilder";

export type SelectInputBuilderRendererProps = {
  Component: React.ComponentType<any>;
  selectInputBuilder: SelectInputBuilder;
  wrapperProps: any;
  props: any;
};

export function SelectInputBuilderRenderer({
  Component,
  selectInputBuilder,
  props,
  wrapperProps,
}: SelectInputBuilderRendererProps) {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    selectInputBuilder.setReRenderHandler(forceUpdate);

    return () => {
      selectInputBuilder.clearCache();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Col {...wrapperProps}>
        <Component key={selectInputBuilder._key} {...props} />
      </Col>
      {selectInputBuilder.spawning.displayed === true &&
        selectInputBuilder.spawning.selectBuilder &&
        selectInputBuilder.spawning.selectBuilder.render()}
    </>
  );
}
