import { Select } from "@mantine/core";
import React from "react";
import { BaseSelect, SelectInputProps } from "./BaseSelect";

export const SelectInput: React.FC<SelectInputProps> = BaseSelect(Select, {
  multiple: false,
  parseValue: value => {
    return String(value);
  },
  onChange: (value, dataList) => {
    return {
      target: {
        value,
      },
      option: dataList.find(option => option.value === value),
    };
  },
});

SelectInput.displayName = "SelectInput";
