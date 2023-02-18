import { SegmentedControl, SegmentedControlProps } from "@mantine/core";
import { trans } from "@mongez/localization";
import { FormInputProps, HiddenInput, useFormInput } from "@mongez/react-form";
import { Random } from "@mongez/reinforcements";
import { requiredRule } from "@mongez/validator";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Tooltip } from "../Tooltip";
import { InputWrapper } from "./InputWrapper";

export type ChooseInputProps = FormInputProps &
  SegmentedControlProps & {
    tooltip?: React.ReactNode;
  };

function mapData(data: SegmentedControlProps["data"]) {
  return data.map(item => {
    if (typeof item === "string") {
      return {
        label: trans(item),
        value: item,
      };
    }

    return item;
  });
}

export function ChooseInput({
  dir,
  description,
  tooltip,
  data: incomingData,
  ...props
}: ChooseInputProps) {
  const { value, onChange, name, otherProps, ...rest } = useFormInput(props);
  const previousValue = useRef(value);
  const keyRef = useRef(Random.string(6));

  // the segment key is used to unmount the component and remount it again
  // if the value is changed to empty value, this is used to reset selection
  const segmentKey = useMemo(() => {
    if (value === "" && previousValue.current !== "") {
      keyRef.current = Random.string(6);
    }

    previousValue.current = value;

    return keyRef.current;
  }, [value]);

  const [data, setData] = useState(() => mapData(incomingData));

  const updateValue = (value: string) => {
    onChange({ target: { value, name } });
  };

  useEffect(() => {
    setData(mapData(incomingData));
  }, [incomingData]);

  const Wrapper: any = tooltip ? Tooltip : React.Fragment;

  const wrapperProps = tooltip ? { label: tooltip } : {};

  return (
    <Wrapper {...wrapperProps}>
      <span>
        <HiddenInput name={name} value={value} />
        <InputWrapper dir={dir} description={description} {...rest}>
          <SegmentedControl
            value={value}
            key={segmentKey}
            onChange={updateValue}
            data={data}
            {...otherProps}
          />
        </InputWrapper>
      </span>
    </Wrapper>
  );
}

ChooseInput.defaultProps = {
  rules: [requiredRule],
};
