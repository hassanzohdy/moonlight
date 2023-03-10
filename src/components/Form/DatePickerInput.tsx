import { DatePicker, DatePickerProps } from "@mantine/dates";
import { trans } from "@mongez/localization";
import {
  getActiveForm,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import { useOnce } from "@mongez/react-hooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getMoonlightConfig } from "../../config";
import { BaseInputProps } from "./BaseInput";
import { InputWrapper } from "./InputWrapper";

export type DatePickerInputProps = DatePickerProps &
  BaseInputProps & {
    minDateInput?: string;
    maxDateInput?: string;
    hint?: React.ReactNode;
    description?: React.ReactNode;
  };

export function DatePickerInput({
  minDateInput,
  maxDateInput,
  hint,
  label,
  required,
  placeholder,
  minDate: incomingMinDate,
  maxDate: incomingMaxDate,
  ...props
}: DatePickerInputProps) {
  const {
    value,
    changeValue,
    id,
    error,
    description,
    visibleElementRef,
    formInput,
    otherProps,
  } = useFormControl(props);

  const [minDate, setMinDate] = useState<Date | undefined>(incomingMaxDate);
  const [maxDate, setMaxDate] = useState<Date | undefined>(incomingMinDate);

  const [date, setDate] = useState<Date | null | undefined>(() => {
    if (!value) return null;

    if (typeof value === "string") {
      return dayjs(value, getMoonlightConfig("form.date.dateFormat")).toDate();
    }

    if (value.timestamp) return new Date(value.timestamp * 1000);

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

      input.on("change", () => {
        const minDate = input.value;

        if (minDate) {
          const minDateValue = dayjs(
            minDate,
            getMoonlightConfig("date.dateFormat")
          ).toDate();

          setMinDate(minDateValue);
        }
      });
    }, 100);
  }, [minDateInput]);

  useOnce(() => {
    const onReset = formInput.on("reset", () => {
      setDate(null);
    });

    return () => onReset.unsubscribe();
  });

  useEffect(() => {
    if (!maxDateInput) return;

    setTimeout(() => {
      const form = getActiveForm();

      if (!form) return;

      const input = form.control(maxDateInput);

      if (!input) return;

      input.on("change", () => {
        const maxDate = input.value;

        if (maxDate) {
          const maxDateValue = dayjs(
            minDate,
            getMoonlightConfig("date.dateFormat")
          ).toDate();

          setMaxDate(maxDateValue);
        }
      });
    }, 100);
  }, [maxDateInput, minDate]);

  const updateDate = (date: Date) => {
    setDate(date);
    changeValue(dayjs(date, getMoonlightConfig("date.dateFormat")), {
      date,
    });
  };

  return (
    <>
      <InputWrapper
        required
        id={id}
        hint={hint}
        description={description}
        error={error}
        visibleElementRef={visibleElementRef}
        label={label}
      >
        <DatePicker
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
