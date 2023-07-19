import { DateInput, DatePickerProps } from "@mantine/dates";
import { trans } from "@mongez/localization";
import {
  getActiveForm,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import { useOnce } from "@mongez/react-hooks";
import dayjs from "dayjs";
import React, { ComponentType, useEffect, useState } from "react";
import { getMoonlightConfig } from "../../config";
import { BaseInputProps } from "./BaseInput";
import { InputWrapper } from "./InputWrapper";

export type DatePickerInputProps = DatePickerProps &
  BaseInputProps & {
    minDateInput?: string;
    maxDateInput?: string;
    hint?: React.ReactNode;
    description?: React.ReactNode;
    component?: ComponentType;
  };

export function DatePickerInput({
  minDateInput,
  maxDateInput,
  hint,
  label,
  required,
  placeholder,
  description,
  component: Component = DateInput,
  minDate: incomingMinDate,
  maxDate: incomingMaxDate,
  ...props
}: DatePickerInputProps) {
  const {
    value,
    changeValue,
    id,
    formControl,
    error,
    visibleElementRef,
    otherProps,
  } = useFormControl(props, {
    collectValue({ value }) {
      if (value.timestamp) return new Date(value.timestamp);

      return value;
    },
  });

  const [minDate, setMinDate] = useState<Date | undefined>(incomingMinDate);
  const [maxDate, setMaxDate] = useState<Date | undefined>(incomingMaxDate);

  const [date, setDate] = useState<Date | null | undefined>(() => {
    if (!value) return null;

    if (typeof value === "string") {
      return dayjs(value, getMoonlightConfig("form.date.dateFormat")).toDate();
    }

    if (value.timestamp) return new Date(value.timestamp);

    return value;
  });

  useEffect(() => {
    if (!incomingMinDate) return;

    setMinDate(incomingMinDate);
  }, [incomingMinDate]);

  useEffect(() => {
    if (!incomingMaxDate) return;

    setMaxDate(incomingMaxDate);
  }, [incomingMaxDate]);

  useEffect(() => {
    if (!minDateInput) return;

    setTimeout(() => {
      const form = getActiveForm();

      if (!form) return;

      const input = form.control(minDateInput);

      if (!input) return;

      input.onChange((...o) => {
        let minDate = input.value?.toDate() || input.value;

        if (minDate.timestamp) {
          minDate = new Date(minDate.timestamp);
        }

        if (minDate) {
          setMinDate(minDate);
        } else {
          setMinDate(undefined);
        }
      });
    }, 100);
  }, [minDateInput]);

  useEffect(() => {
    if (!maxDateInput) return;

    setTimeout(() => {
      const form = getActiveForm();

      if (!form) return;

      const input = form.control(maxDateInput);

      if (!input) return;

      input.onChange(() => {
        let maxDate = input.value?.toDate() || input.value;

        if (maxDate.timestamp) {
          maxDate = new Date(maxDate.timestamp);
        }

        console.log(maxDate);

        if (maxDate) {
          setMaxDate(maxDate);
        } else {
          setMaxDate(undefined);
        }
      });
    }, 100);
  }, [maxDateInput, minDate]);

  useOnce(() => {
    const onReset = formControl.onReset(() => {
      setDate(null);
    });

    return () => onReset.unsubscribe();
  });

  const updateDate = (date: Date) => {
    setDate(date);
    changeValue(
      date ? dayjs(date, getMoonlightConfig("date.dateFormat")) : null,
      {
        date,
      },
    );
  };

  return (
    <>
      <InputWrapper
        required={required}
        id={id}
        hint={hint}
        description={description}
        error={error}
        visibleElementRef={visibleElementRef}
        label={label}>
        <Component
          onChange={updateDate}
          id={id}
          value={date}
          minDate={minDate}
          inputFormat={getMoonlightConfig("date.dateFormat")}
          maxDate={maxDate}
          clearable={!required}
          placeholder={placeholder && trans(placeholder)}
          {...otherProps}
        />
      </InputWrapper>
    </>
  );
}

DatePickerInput.defaultProps = {
  //
  rules: [requiredRule],
};
