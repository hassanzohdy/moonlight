import { Col, Flex, Loader } from "@mantine/core";
import { get } from "@mongez/reinforcements";
import React, { useEffect, useMemo, useState } from "react";
import { InputWrapper } from "../../components/Form";
import { toastError } from "../../components/Toast";
import { getMoonlightConfig } from "./../../config";
import { parseError } from "./../../utils/parse-error";
import { ChipsInputBuilder } from "./ChipsInputBuilder";

export type ChipsInputRendererProps = {
  Component: React.ComponentType<any>;
  builder: ChipsInputBuilder;
  wrapperProps: any;
  props: any;
  request?: () => Promise<any>;
  data?: any[];
  defaultChecked?: any;
};

export function ChipsInputRenderer({
  Component,
  builder,
  props,
  defaultChecked,
  request,
  data: incomingData,
  wrapperProps,
}: ChipsInputRendererProps) {
  const [isLoading, setIsLoading] = useState(request !== undefined);
  const [data, setData] = useState(incomingData || []);
  useEffect(() => {
    if (!request) return;
    setIsLoading(true);

    request()
      .then(response => {
        const dataKey = getMoonlightConfig("select.responseDataKey", "records");

        const data: any[] = get(response.data, dataKey, "records");

        setData(data.map(option => builder.mapOptionCallback(option)));
        setIsLoading(false);
      })
      .catch(error => {
        toastError(parseError(error));
        setIsLoading(false);
      });
  }, [builder, request]);

  const chipsList = useMemo(() => {
    const checkedValues = builder.isMultiple
      ? (defaultChecked || []).map(String)
      : [String(defaultChecked)];
    return data.map((option, index) => {
      return (
        <Component
          {...props}
          defaultChecked={checkedValues.includes(String(option.value))}
          key={builder._key + index}
          defaultValue={option.value}
          label={option.label}
        />
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Col {...wrapperProps}>
        <InputWrapper label={builder.getLabel()}>
          <Flex wrap="wrap" gap="md">
            {isLoading && <Loader />}
            {!isLoading && chipsList}
          </Flex>
        </InputWrapper>
      </Col>
    </>
  );
}
