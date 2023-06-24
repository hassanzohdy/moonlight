import { ActionIcon } from "@mantine/core";
import { TimeInput, TimeInputProps } from "@mantine/dates";
import { requiredRule } from "@mongez/react-form";
import { IconClock } from "@tabler/icons-react";
import React, { useRef } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

function _TimePickerInput(props: TimeInputProps & BaseInputProps, ref: any) {
  const innerRef = useRef<HTMLInputElement>();

  return (
    <BaseInput
      component={TimeInput}
      onFocus={() => innerRef.current?.showPicker()}
      icon={
        <ActionIcon onClick={() => innerRef.current?.showPicker()}>
          <IconClock size="1rem" stroke={1.5} />
        </ActionIcon>
      }
      {...props}
      ref={(inputRef: HTMLInputElement) => {
        innerRef.current = inputRef;

        if (typeof ref === "function") {
          ref(inputRef);
        } else if (ref) {
          ref.current = inputRef;
        }
      }}
    />
  );
}

export const TimePickerInput = React.forwardRef(_TimePickerInput);

TimePickerInput.defaultProps = {
  type: "time",
  rules: [requiredRule],
};
