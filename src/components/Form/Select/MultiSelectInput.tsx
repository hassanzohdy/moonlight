import { MultiSelect } from "@mantine/core";
import React from "react";
import { defaultSelectProps } from "../../../utils/select";
import { BaseSelect, SelectInputProps } from "./BaseSelect";

export const MultiSelectInput: React.FC<SelectInputProps> = BaseSelect(
  MultiSelect,
  {
    multiple: true,
    parseValue: (value: any) => {
      if (!Array.isArray(value)) {
        value = [value];
      }

      return (value || []).map(String);
    },
    onChange: (value, dataList) => {
      return {
        target: {
          value,
        },
        options: dataList.filter(option =>
          value.includes(String(option.value)),
        ),
      };
    },
  },
  {
    ...defaultSelectProps,
    searchable: true,
  },
);

MultiSelectInput.displayName = "MultiSelectInput";
